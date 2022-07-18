import axios, { AxiosResponse } from "axios";
import { ProjectDetailsDto } from "../models/time_dashboard";
import { ProjectSummary } from "../models/project_summary";
import { ProjectGraph } from "../models/project_graph";


axios.defaults.baseURL = 'http://localhost:3001/api';

const responseBody = <T> (Response: AxiosResponse<T>) => Response.data;

const request = {	
	get: <T> (url: string) => axios.get<T>(url).then(responseBody),
}

const TimeDashboard = {
	list: () => request.get<ProjectDetailsDto[]>('/timeloggerdashboard'),
	projectSummary: () => request.get<ProjectSummary>('/projectsummary'),
	projectRatio: () => request.get<ProjectGraph[]>('/projectratio'),
}

const agentDashboard = {
	TimeDashboard
}

export default agentDashboard;