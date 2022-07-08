
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/app/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Footer from 'src/app/components/Footer';

import { useEffect, useState } from 'react';
import agentActivity from 'src/app/api/activities';
import { Activity } from 'src/app/models/activity';
import RecentActivities from './RecentActivities';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import agentProject from 'src/app/api/projects';
import { Project } from 'src/app/models/project';

function ApplicationsActivities() {
  const user = {
    name: 'Benito Ponappan ',
    avatar: '/static/images/avatars/1.jpg'
  };
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(()=> {
      agentActivity.Activities.list().then(response => {
          setActivities(response);
      })
  }, [])

  const [projects, setProjects] = useState<Project[]>([]);
  
    useEffect(()=> {
        agentProject.Projects.list().then(response => {
            setProjects(response);
        })
    }, [])

  const [openActivityForm, setOpenActivityForm] = useState(false);

  const handleAddActivity = () => {
    setOpenActivityForm(!openActivityForm);
    };

    
  return (
    <>
      <Helmet>
        <title>Activities - Applications</title>
      </Helmet>
      <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Activities
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent activities
        </Typography>
      </Grid>
      <Grid item>
       {openActivityForm === false ? (<Button
          sx={{ mt: { xs: 2, md: 0} }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleAddActivity}
        >
          Create activity
        </Button>):''}
      </Grid>
      </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentActivities openActivityForm={openActivityForm} handleActivityForm={handleAddActivity} activities={activities} 
              projects={projects}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsActivities;
