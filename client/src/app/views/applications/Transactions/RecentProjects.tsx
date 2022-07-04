
import { Card } from '@mui/material';
import RecentProjectsTable from './RecentProjectsTable';
import { useEffect, useState } from 'react';
import agentProject from 'src/app/api/projects';
import { Project } from 'src/app/models/project';


function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(()=> {
      agentProject.Projects.list().then(response => {
           console.log(response);
          setProjects(response);
      })
  }, [])

  //console.log(projects);

  return (
    <Card>
      <RecentProjectsTable projects={projects} />
    </Card>
  );
}

export default RecentProjects;
