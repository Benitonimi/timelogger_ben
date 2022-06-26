import axios, { AxiosResponse } from "axios";
import { Project } from '../models/project';


//const BASE_URL = 'http://localhost:3000/api';

/* const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay)
	})
} */

axios.defaults.baseURL = 'http://localhost:3001/api';

/* axios.interceptors.response.use(async response => {
	try{
		await sleep(1000);
		return response;
	}
	catch (error) {
		console.log(error);
		return await Promise.reject(error);
	}
}) */

const responseBody = <T> (Response: AxiosResponse<T>) => Response.data;

const request = {	
	get: <T> (url: string) => axios.get<T>(url).then(responseBody),
	post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Projects = {
	list: () => request.get<Project[]>('/projects'),
	details: (id: number) => request.get<Project>(`/projects/${id}`),
	create: (project: Project) => request.post<void>('/projects', project),
	update: (project: Project) => request.put<void>(`/projects/${project.id}`, project),
	delete: (id: number) => request.delete<void>(`/projects/${id}`)
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