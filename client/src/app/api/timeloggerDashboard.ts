import axios, { AxiosResponse } from "axios";
import { ProjectDetailsDto } from "../models/time_dashboard";


axios.defaults.baseURL = 'http://localhost:3001/api';

const responseBody = <T> (Response: AxiosResponse<T>) => Response.data;

const request = {	
	get: <T> (url: string) => axios.get<T>(url).then(responseBody),
}

const TimeDashboard = {
	list: () => request.get<ProjectDetailsDto[]>('/timeloggerdashboard')
}

const agentDashboard = {
	TimeDashboard
}

export default agentDashboard;