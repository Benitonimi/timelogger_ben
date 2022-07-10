import { Project } from "./project";

export type ActivityStatus = 'completed' | 'pending' | 'failed' | '';

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