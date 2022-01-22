    export enum ProjectStatus { Active, Finished }

    export interface Project {
        id: string;
        title: string;
        description: string;
        people: number;
        status: ProjectStatus;
    }

    /*SingleProject class*/
    export class singleProject implements Project {
        constructor(public id: string,
            public title: string,
            public description: string,
            public people: number,
            public status: ProjectStatus) {
    
        }
    }
