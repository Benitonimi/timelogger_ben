import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/app/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/app/components/Footer';

import ProjectTimeChart from './ProjectTimeChart';
import AccountSecurity from './AccountSecurity';
import ProjectSummary from './ProjectSummary';
import agentDashboard from 'src/app/api/timeloggerDashboard';
import { ProjectDetailsDto } from 'src/app/models/time_dashboard';
import { useEffect, useState } from 'react';
import { ProjectSummary as ProjectDashboardSummary} from 'src/app/models/project_summary';
import { ProjectGraph } from 'src/app/models/project_graph';


function DashboardTimelogger() {

  const [projects, setProjects] = useState<ProjectDetailsDto[]>([]);
    
  useEffect(()=> {
    agentDashboard.TimeDashboard.list().then(response => {
          setProjects(response);
      })
  }, [])

  const [projectSummary, setProjectSummary] = useState<ProjectDashboardSummary>();
    
  useEffect(()=> {
    agentDashboard.TimeDashboard.projectSummary().then(response => {
          setProjectSummary(response);
      })
  }, [])
   console.log(projectSummary);

   const [projectGraphDetails, setProjectGraphDetails] = useState<ProjectGraph[]>([]);
    
  useEffect(()=> {
    agentDashboard.TimeDashboard.projectRatio().then(response => {
      setProjectGraphDetails(response);
      })
  }, [])
   console.log(projectGraphDetails);

  return (
    <>
      <Helmet>
        <title>Timelogger Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <ProjectSummary projectDetails = { projects } projectSummary = { projectSummary }/>
          </Grid>
          <Grid item lg={6} xs={12}>
            <ProjectTimeChart projectGraphDetails = { projectGraphDetails } />
          </Grid>
          <Grid item lg={6} xs={12}>
            <AccountSecurity />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardTimelogger;
