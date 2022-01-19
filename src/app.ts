//validate function 
interface ValidatorObject {
value: string|number;
required?: boolean;
minLength?: number;
maxLength?: number;
min?: number;
max?: number;
}

function validate(validatableInput: ValidatorObject){
    let isValid = true;
    if(validatableInput.required ){
        isValid = isValid && validatableInput.value.toString().trim().length !== 0
    }
    if(validatableInput.minLength !== undefined && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength
    }
    if(validatableInput.maxLength !== undefined && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength
    }
    if(validatableInput.min !== undefined && typeof validatableInput.value === 'number' ){
        isValid = isValid && validatableInput.value >= validatableInput.min
    }
    if(validatableInput.max !== undefined && typeof validatableInput.value === 'number' ){
        isValid = isValid && validatableInput.value <= validatableInput.max
    }    
    return isValid;
}


// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor){
// console.log(`Autobind function ${target}`);
// console.log(`Autobind function ${methodName}`);
// console.log(`Autobind function ${Object.keys(descriptor)}`);
const originalMethod = descriptor.value;
const newDescriptor : PropertyDescriptor ={
    configurable: true,
    get(){
        const boundFn = originalMethod.bind(this);
        //console.log(boundFn);       
        return boundFn;
    }

}

return newDescriptor;
}
/*-------------------------DOM Elements---------------------------------------*/

const templateProjectInputEl = document.getElementById('project-input');


const templateSingleProjectEl = document.getElementById('single-project');
const templateProjectListEl = document.getElementById('project-list');
const projectSectionEl = document.getElementsByClassName('projects');
const appDiv = document.getElementById('app');
/***ProjectInput Class */
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formEl: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;
    textAreaDescriptionEl: HTMLTextAreaElement;
    submitButtonEl: HTMLButtonElement;

    constructor() {
        // const templateProjectInputEl = document.getElementById('project-input');
        // if(templateProjectInputEl){
        //     this.templateElement = templateProjectInputEl as HTMLTemplateElement;
        // }

        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        //capture the form in the templates content
        this.formEl = document.importNode(this.templateElement.content, true).firstElementChild as HTMLFormElement;
        this.formEl.id = 'user-input'
        this.titleInputEl = this.formEl.querySelector('#title')! as HTMLInputElement;
        this.peopleInputEl = this.formEl.querySelector('#people')! as HTMLInputElement;
        this.textAreaDescriptionEl = this.formEl.querySelector('#description')! as HTMLTextAreaElement;
        this.submitButtonEl = this.formEl.querySelector('button')! as HTMLButtonElement;
        this.configure();
        this.attach();
    }
private gatherUserInput():[string,string,number] | void{
    const title = this.titleInputEl.value;
    const description = this.textAreaDescriptionEl.value;
    const people = this.peopleInputEl.value;

    const titleOptions :ValidatorObject ={
        value: title,
        required: true,
        minLength: 5,
        maxLength: 30,
    }
    const descriptionOptions :ValidatorObject ={
        value: description,
        required: true,
        minLength: 5,
        maxLength: 255,
    }
    const peopleOptions :ValidatorObject ={
        value: parseInt(people),
        required: true,
        min: 1,
        max: 10
    }
    if(!validate(titleOptions) || !validate(descriptionOptions) || !validate(peopleOptions)){
        alert('Invalid Input, try again');
        return;
    }else{
        return [title,description,parseInt(people)]
    }
}

    private clearInputs(){
        this.titleInputEl.value = "";
        this.peopleInputEl.value = "";
        this.textAreaDescriptionEl.value = "";

    }

    @autobind
    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            const [title, description,people] = userInput;
            console.log(`${title}, ${description}, ${people}`);
            this.clearInputs()
        }   
    }
    private configure() {
        this.formEl.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.formEl)
        //Different way to append template into div tag
        // const templateClone = this.templateElement.content.cloneNode(true);
        // this.hostElement.appendChild(templateClone);
    }

   

}

const projectInput = new ProjectInput()