 // Component Base class
    export abstract class ComponentBase<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: U;
    
        constructor(templateElementId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
            this.templateElement = document.getElementById(templateElementId)! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId)! as T;
            this.element = document.importNode(this.templateElement.content, true).firstElementChild as U;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart)
        }
        private attach(insertAtBeginning: boolean) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
            //Different way to append template into div tag
            // const templateClone = this.templateElement.content.cloneNode(true);
            // this.hostElement.appendChild(templateClone);
        }
        abstract configure(): void;
        abstract renderContent(): void;
    }
