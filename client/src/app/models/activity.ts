import { Project } from "./project";

export type ActivityStatus = 'completed' | 'pending' | 'failed';

export interface Activity {
    id: string;
    name: string;
    description: string;
    projectId: string;
    status: ActivityStatus;
    project: Project;
    totalHours: number;
    startDate: Date;
    endDate: Date;
}


/* project?: {
    id: string;
    name: string;
    description: string;
    activity: Activity[];
    status: string;
    startDate: string;
    endDate: string | null;
    currency: number;
}; */