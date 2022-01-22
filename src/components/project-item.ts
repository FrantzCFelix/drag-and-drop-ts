import {Draggable} from "../models/drag-drop-interfaces.js";
import {ComponentBase} from "./base-component.js";
import {Project} from "../models/project-model.js";
import {autobind} from "../decorators/autobind.js";

     /**Project Item */
    export class projectItem extends ComponentBase<HTMLUListElement, HTMLLIElement> implements Draggable {
        //private project: Project
    
        get persons() {
            if (this.project.people === 1) {
                return '1 person'
            }
            else {
                return `${this.project.people} people`
            }
        }
        constructor(hostId: string, private project: Project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
    
            this.configure();
            this.renderContent();
        }
        @autobind
        dragStartHandler(event: DragEvent) {
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }
        @autobind
        dragEndHandler(_event: DragEvent) {
            //console.log(event);
    
        }
    
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragstart', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent = this.project.description;
            this.element.querySelector('p')!.textContent = `${this.persons} working on this`;
        }
    }
