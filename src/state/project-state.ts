import {Project,ProjectStatus,singleProject} from "../models/project-model.js";

    type Listener<T> = (items: T[]) => void;

    abstract class State<T>{
        protected listeners: Listener<T>[] = []
    
        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }
    // Project state management class
    export class ProjectStateManager extends State<Project> {
        private projects: Project[] = [];
        private static instance: ProjectStateManager;
        private constructor() {
            super();
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
            this.updateListeners();  
        }
        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId)
            if(project && project.status !== newStatus){
                project.status = newStatus;
                this.updateListeners();
            }
        }
        private updateListeners(){
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    // State manager instance
    export const projectState = ProjectStateManager.getInstance();

