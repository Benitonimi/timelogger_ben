
import { Card, Grid } from '@mui/material';
import RecentActivitiesTable from './RecentActivitiesTable';
import { FC } from 'react';
import { Activity } from 'src/app/models/activity';
import AddActivity from './AddActivity';
import { Project } from 'src/app/models/project';

export interface RecentActivitiesProps {
  className?: string;
  openActivityForm: boolean;
  handleActivityForm: () => void;
  activities:  Activity[];
  projects: Project[];
}

const RecentActivities: FC<RecentActivitiesProps> = ({ openActivityForm, handleActivityForm, activities, projects }) => { {


  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>
      {openActivityForm === true ? (
        <Card>
          <AddActivity openActivityForm={openActivityForm} handleActivityForm={handleActivityForm} activities={activities} 
            projects={projects}/>
        </Card>):''}
      </Grid>
      
      <Grid item xs={12}>
        <Card>
          <RecentActivitiesTable activities={activities} />
        </Card>
      </Grid>
    </Grid>

      
  );
};
};

export default RecentActivities;
