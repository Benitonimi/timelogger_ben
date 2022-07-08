
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/app/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Footer from 'src/app/components/Footer';

import RecentProjects from './RecentProjects';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import agentProject from 'src/app/api/projects';
import { Project } from 'src/app/models/project';


function ApplicationsProjects() {

  const user = {
    name: 'Benito Ponappan ',
    avatar: '/static/images/avatars/1.jpg'
  };
  
  const [projects, setProjects] = useState<Project[]>([]);
    
  useEffect(()=> {
      agentProject.Projects.list().then(response => {
          setProjects(response);
      })
  }, [])
  
  const [openProjectForm, setOpenProjectForm] = useState(false);
  
  const handleAddProject = () => {
    setOpenProjectForm(!openProjectForm);
    };
  

  return (
    <>
      <Helmet>
        <title>Projects - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Projects
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are your recent projects
            </Typography>
          </Grid>
          <Grid item>
          {openProjectForm === false ? (<Button
              sx={{ mt: { xs: 2, md: 0} }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={handleAddProject}
            >
              Create project
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
            <RecentProjects openProjectForm={openProjectForm} handleProjectForm={handleAddProject} projects={projects}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsProjects;
