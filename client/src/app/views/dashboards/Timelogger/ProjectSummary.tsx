import {
    Box,
    Typography,
    Avatar,
    useTheme,
    styled,
    Card,
    Grid,
  } from '@mui/material';
  
  import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
  import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
  import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
  import AccountBalanceWalletTwoTone from '@mui/icons-material/AccountBalanceWalletTwoTone';
  import { ProjectDetailsDto} from 'src/app/models/time_dashboard';
  import { ProjectSummary  as ProjectDashboardSummary} from 'src/app/models/project_summary';
  
  import { FC } from 'react';

  const AvatarPrimary = styled(Avatar)(
    ({ theme }) => `
        background: ${theme.colors.primary.lighter};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};
  `
  );

  export interface ProjectSummaryProps {
    projectDetails : ProjectDetailsDto[];
    projectSummary : ProjectDashboardSummary | undefined;
  }
  
  const ProjectSummary: FC<ProjectSummaryProps> = ({ projectDetails, projectSummary }) => {
    const theme = useTheme();

    return(
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3} item>
          <Card>
            <Box px={2} py={4} display="flex" flexDirection="column" alignItems="flex-start">
              <AvatarPrimary>
                <ShoppingBagTwoToneIcon />
              </AvatarPrimary>
              <Box pl={2} flex={1}>
                <Typography variant="h3">Projects</Typography>

                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Total
                    </Typography>
                    <Typography variant="h2">{projectDetails.length}</Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Active
                    </Typography>
                    <Typography variant="h2">{projectSummary?.activeProjectCount}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
          <Card>
            <Box px={2} py={4} display="flex" flexDirection="column" alignItems="flex-start">
              <AvatarPrimary>
                <FavoriteTwoToneIcon />
              </AvatarPrimary>
              <Box pl={2} flex={1}>
                <Typography variant="h3">Activities</Typography>

                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Total
                    </Typography>
                    <Typography variant="h2">{projectSummary?.totalActivityCount}</Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Active
                    </Typography>
                    <Typography variant="h2">{projectSummary?.activeActivityCount}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <Card>
              <Box px={2} py={4} display="flex" flexDirection="column" alignItems="flex-start">
                <AvatarPrimary>
                  <StarTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography variant="h3">Revenue</Typography>

                  <Box pt={2} display="flex">
                    <Box pr={8}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Total
                      </Typography>
                      <Typography variant="h2">${projectSummary?.totalProjectRevenue}M</Typography>
                    </Box>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        
                      </Typography>
                      <Typography variant="h2"></Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3} item>
            <Card>
              <Box px={2} py={4} display="flex" flexDirection="column" alignItems="flex-start">
                <AvatarPrimary>
                  <AccountBalanceWalletTwoTone />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography variant="h3">Cost</Typography>

                  <Box pt={2} display="flex">
                    <Box pr={8}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Total
                      </Typography>
                      <Typography variant="h2">${projectSummary?.totalProjectCost}M</Typography>
                    </Box>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="h2"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                      </Typography>
                      <Typography variant="h2"></Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
    );
  };
  
  export default ProjectSummary;