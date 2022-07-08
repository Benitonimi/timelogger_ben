//import { Activity } from "./activity";

export type ProjectStatus = 'completed' | 'pending' | 'failed';

// export interface Project{
//     id: string;
//     name: string;
//     description: string;
//     status: ProjectStatus;
//     startDate: number;
//     endDate: number;
//     currency: string;
// }

export interface Project {
    id: string;
    name: string;
    description: string;
    //activity?: Activity[] | null;
    status: ProjectStatus;
    startDate: Date;
    endDate: Date;
    currency: number;
}

//startDate: "2022-06-19T00:00:00+05:30"
