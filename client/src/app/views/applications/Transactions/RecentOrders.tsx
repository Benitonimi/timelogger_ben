
import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useEffect, useState } from 'react';
import agent from 'src/app/api/projects';
import { Project } from 'src/app/models/project';


function RecentOrders() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(()=> {
      agent.Projects.list().then(response => {
           console.log(response);
           /* let projects: Project[] = [];
           response.forEach(project => {
            project.startDate = project.startDate.split('T')[0];
            projects.push(project);
           }) */
          setProjects(response);
      })
  }, [])

  //console.log(projects);

  return (
    <Card>
      <RecentOrdersTable projects={projects} />
    </Card>
  );
}

export default RecentOrders;
