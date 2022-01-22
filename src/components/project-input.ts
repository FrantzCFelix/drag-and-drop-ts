import {ComponentBase} from "./base-component.js";
import {projectState} from "../state/project-state.js";
import {autobind} from "../decorators/autobind.js";
import {validate,ValidatorObject } from "../util/validation.js";

    /*ProjectInput Class*/
    export class ProjectInput extends ComponentBase<HTMLDivElement, HTMLFormElement>{
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
        renderContent() {
    
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
