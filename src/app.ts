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
type Listener<T> = (items: T[]) => void;

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
abstract class State<T>{
    protected listeners: Listener<T>[] = []

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}
// Project state management class
class ProjectStateManager extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectStateManager;
    private constructor() {
        super();
        // ProjectStateManager.instance = new ProjectStateManager;
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectStateManager();
        return this.instance;
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

/**Project Item */
// class projectItem {

// }
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
    //should be private but abstarct private classes are not supported in typeScript.
    renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`

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
}
/*ProjectInput Class*/
class ProjectInput extends ComponentBase<HTMLDivElement, HTMLFormElement>{
    titleInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;
    textAreaDescriptionEl: HTMLTextAreaElement;
    submitButtonEl: HTMLButtonElement;

    constructor() {
        super('project-input', 'app', true, 'user-input')
        // const templateProjectInputEl = document.getElementById('project-input');
        // if(templateProjectInputEl){
        //     this.templateElement = templateProjectInputEl as HTMLTemplateElement;
        // }
        this.titleInputEl = this.element.querySelector('#title')! as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people')! as HTMLInputElement;
        this.textAreaDescriptionEl = this.element.querySelector('#description')! as HTMLTextAreaElement;
        this.submitButtonEl = this.element.querySelector('button')! as HTMLButtonElement;
        this.configure();
        //this.attach();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
    renderContent(){

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
}

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
