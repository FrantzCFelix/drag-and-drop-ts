import {DragTarget} from "../models/drag-drop-interfaces.js";
import {ComponentBase} from "./base-component.js";
import {Project, ProjectStatus} from "../models/project-model.js";
import {autobind} from "../decorators/autobind.js";
import {projectState} from "../state/project-state.js";
import {projectItem} from "./project-item.js";



    /*ProjectList Class*/
    export class ProjectList extends ComponentBase<HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[];
        constructor(private type: 'active' | 'finished') {
            super('project-list', 'app', false, `${type}-projects`)
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
    
        @autobind
        dragOverHandler(event: DragEvent) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                //Allows you to make the item droppable
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable');
            }
        }
        @autobind
        dropHandler(event: DragEvent) {
            const prjId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(prjId, this.type ==='active' ? ProjectStatus.Active : ProjectStatus.Finished);
        }
        @autobind
        dragLeaveHandler(_event: DragEvent) {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable');
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
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
            for (const prjtItem of this.assignedProjects) {
                new projectItem(this.element.querySelector('ul')!.id, prjtItem)
    
    
                // const listItem = document.createElement('li');
                // listItem.textContent = projectItem.title;
                // //console.log(listItem);
    
                // ulistEl.appendChild(listItem);
            }
        }
    }
