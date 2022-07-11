import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/app/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/app/components/Footer';

import ProjectTimeChart from './ProjectTimeChart';
import AccountSecurity from './AccountSecurity';
import ProjectSummary from './ProjectSummary';


function DashboardTimelogger() {

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
            <ProjectSummary/>
          </Grid>
          <Grid item lg={6} xs={12}>
            <ProjectTimeChart />
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
