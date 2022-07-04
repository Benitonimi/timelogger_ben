
import { Typography, Grid, Button } from '@mui/material';
import AddProject from './AddProject';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';


function PageHeader() {
  const user = {
    name: 'Benito Ponappan ',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [openProjectForm, setOpenProjectForm] = useState(false);

  const handleAddProject = () => {
    setOpenProjectForm(!openProjectForm);
    };

  return (
    <><Grid container justifyContent="space-between" alignItems="center">
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
    </Grid><AddProject openProjectForm={openProjectForm} handleProjectForm={handleAddProject} /></>

  );
}

export default PageHeader;
