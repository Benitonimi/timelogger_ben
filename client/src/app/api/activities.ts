import axios, { AxiosResponse } from "axios";
import { Activity } from '../models/activity';


axios.defaults.baseURL = 'http://localhost:3001/api';

const responseBody = <T> (Response: AxiosResponse<T>) => Response.data;

const request = {	
	get: <T> (url: string) => axios.get<T>(url).then(responseBody),
	post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
	list: () => request.get<Activity[]>('/activities'),
	details: (id: number) => request.get<Activity>(`/activities/${id}`),
	create: (project: Activity) => request.post<void>('/activities', project),
	update: (project: Activity) => request.put<void>(`/activities/update/${project.id}`, project),
	delete: (id: number) => request.delete<void>(`/activities/${id}`)
}

const agentActivity = {
	Activities
}

export default agentActivity;