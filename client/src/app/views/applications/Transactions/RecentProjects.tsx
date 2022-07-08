
import { Card, Grid } from '@mui/material';
import RecentProjectsTable from './RecentProjectsTable';
import { FC } from 'react';
import { Project } from 'src/app/models/project';
import AddProject from './AddProject';

export interface RecentProjectsProps {
  className?: string;
  openProjectForm: boolean;
  handleProjectForm: () => void;
  projects: Project[];
}

const RecentProjects: FC<RecentProjectsProps> = ({ openProjectForm, handleProjectForm: handleProjectForm, projects }) => {
  {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
        {openProjectForm === true ? (
          <Card>
            <AddProject openProjectForm={openProjectForm} handleProjectForm={handleProjectForm} projects={projects}/>
          </Card>):''}
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <RecentProjectsTable projects={projects} />
          </Card>
        </Grid>
      </Grid>
    );
  };
};

export default RecentProjects;
