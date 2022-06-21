import axios, { AxiosResponse } from "axios";
import { Project } from '../models/project';


//const BASE_URL = 'http://localhost:3000/api';

axios.defaults.baseURL = 'http://localhost:3001/api';

const responseBody = <T> (Response: AxiosResponse<T>) => Response.data;

const request = {	
	get: <T> (url: string) => axios.get<T>(url).then(responseBody),
	post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Projects = {
	list: () => request.get<Project[]>('/projects')
}

const agent = {
	Projects
}

export default agent;
/*
export async function getAll() {
	const response = await fetch(`${BASE_URL}/projects`);
	return response.json();
}


export async function getProjectById(id: number) {
	const response = await fetch(`${BASE_URL}/projects/${id}`);
	return response.json();
}
*/