import React, { useEffect, useState } from 'react';
import agent from '../api/projects';
import { Project } from '../models/project';

export default function Table() {
	const [projects, setProjects] = useState<Project[]>([]);

    useEffect(()=> {
        agent.Projects.list().then(response => {
            // console.log(response);
            setProjects(response);
        })
    }, [])


	return (
		<table className="table-fixed w-full">
			<thead className="bg-gray-200">
				<tr>
					<th className="border px-4 py-2 w-12">#</th>
					<th className="border px-4 py-2">Project Name</th>
					<th className="border px-4 py-2">abc</th>
					<th className="border px-4 py-2">xyz</th>
				</tr>
			</thead>
			<tbody>
				{projects.map((project) => (
						<tr>
							<>
							<td className="border px-4 py-2 w-12">{project.id}</td>
							<td className="border px-4 py-2">{project.name}</td>
							<td className="border px-4 py-2">abc</td>
							<td className="border px-4 py-2">xyz</td>
							</>
						</tr>
					))}
				
				{/*<tr>
					<td className="border px-4 py-2 w-12">1</td>
					<td className="border px-4 py-2">Project 1</td>
					<td className="border px-4 py-2">abc</td>
					<td className="border px-4 py-2">xyz</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-12">2</td>
					<td className="border px-4 py-2">Project 2</td>
					<td className="border px-4 py-2">abc</td>
					<td className="border px-4 py-2">xyz</td>
				</tr>
				<tr>
					<td className="border px-4 py-2 w-12">3</td>
					<td className="border px-4 py-2">Project 3</td>
					<td className="border px-4 py-2">abc</td>
					<td className="border px-4 py-2">xyz</td>
				</tr> */}
			</tbody>
		</table>
	);
}