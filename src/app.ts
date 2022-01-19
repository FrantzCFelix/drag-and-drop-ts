//import { v4 as uuidv4 } from 'uuid';
enum ProjectStatus { Active, Finished }

interface ValidatorObject {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
interface Project {
    id: string;
    title: string;
    description: string;
    people: number;
    status: ProjectStatus;
}
type Listener = (items: Project[]) => void;

function validate(validatableInput: ValidatorObject) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0
    }
    if (validatableInput.minLength !== undefined && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength
    }
    if (validatableInput.maxLength !== undefined && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength
    }
    if (validatableInput.min !== undefined && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min
    }
    if (validatableInput.max !== undefined && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max
    }
    return isValid;
}
// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    // console.log(`Autobind function ${target}`);
    // console.log(`Autobind function ${methodName}`);
    // console.log(`Autobind function ${Object.keys(descriptor)}`);
    const originalMethod = descriptor.value;
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            //console.log(boundFn);       
            return boundFn;
        }

    }

    return newDescriptor;
}

// Project state management class
class ProjectStateManager {
    private listeners: Listener[] = []
    private projects: Project[] = [];
    private static instance: ProjectStateManager;

    private constructor() {
        // ProjectStateManager.instance = new ProjectStateManager;
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectStateManager();
        return this.instance;
    }
    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new singleProject(Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active)


        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
// State manager instance
const projectState = ProjectStateManager.getInstance();

// Component Base class
abstract class ComponentBase<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateElementId: string, hostElementId: string, insertAtStart: boolean,newElementId?: string){
        this.templateElement = document.getElementById(templateElementId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;
        this.element = document.importNode(this.templateElement.content, true).firstElementChild as U;
        if(newElementId){
            this.element.id = newElementId;
        }
        this.attach(insertAtStart)
    }
    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement( insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
        //Different way to append template into div tag
        // const templateClone = this.templateElement.content.cloneNode(true);
        // this.hostElement.appendChild(templateClone);
    }
    abstract configure(): void;
    abstract renderContent(): void;
}

/*SingleProject class*/
class singleProject implements Project {
    constructor(public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus) {

    }
}
/*ProjectList Class*/
class ProjectList extends ComponentBase<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[];
    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`)
    
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

    configure(){
        projectState.addListener((projects: Project[]) => {
            const releventProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active
                }
                return project.status === ProjectStatus.Finished
            })
            this.assignedProjects = releventProjects;
            this.renderProjects();
        });

    }
    private renderProjects() {
        const ulistEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        ulistEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            //console.log(listItem);

            ulistEl.appendChild(listItem);
        }
    }
    //should be private but abstarct private classes are not supported in typeScript.
    renderContent() {
        const listId = `${this.type}-projects-list`
        this.sectionElement.querySelector('ul')!.id = listId
        this.sectionElement.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`

    }


}
/*ProjectInput Class*/
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
    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputEl.value;
        const description = this.textAreaDescriptionEl.value;
        const people = this.peopleInputEl.value;

        const titleOptions: ValidatorObject = {
            value: title,
            required: true,
            minLength: 5,
            maxLength: 30,
        }
        const descriptionOptions: ValidatorObject = {
            value: description,
            required: true,
            minLength: 5,
            maxLength: 255,
        }
        const peopleOptions: ValidatorObject = {
            value: parseInt(people),
            required: true,
            min: 1,
            max: 10
        }
        if (!validate(titleOptions) || !validate(descriptionOptions) || !validate(peopleOptions)) {
            alert('Invalid Input, try again');
            return;
        } else {
            return [title, description, parseInt(people)]
        }
    }
    private clearInputs() {
        this.titleInputEl.value = "";
        this.peopleInputEl.value = "";
        this.textAreaDescriptionEl.value = "";

    }
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            //console.log(`${title}, ${description}, ${people}`);
            projectState.addProject(title, description, people)
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

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
