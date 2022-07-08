
import { Typography, Grid, Button } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const user = {
    name: 'Benito Ponappan ',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
      <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Activities
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent projects
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0} }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create activity
        </Button>
      </Grid>
      </Grid>

  );
}

export default PageHeader;
