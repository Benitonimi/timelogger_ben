import { Activity } from "./activity";

export type ProjectStatus = 'completed' | 'pending' | 'failed' | '';

export interface ProjectDetailsDto {
    id: string;
    name: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
    estimatedCost: number;
    totalProjectDays: number;
    activeProjectCount: number;
    activities: Activity[];
}