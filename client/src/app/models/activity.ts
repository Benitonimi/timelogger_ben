import { Project } from "./project";

export type ActivityStatus = 'completed' | 'pending' | 'failed';

export interface Activity {
    id: string;
    name: string;
    description: string;
    projectId: string | null;
    status: ActivityStatus;
    project?: Project[]| null;
    totalHours: string | null;
    startDate: Date | null;
    endDate: Date | null;
}


