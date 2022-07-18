import {
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  CardHeader
} from '@mui/material';
import Text from 'src/app/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { ProjectGraph } from 'src/app/models/project_graph';
import { FC } from 'react';
import LocalActivityTwoTone from '@mui/icons-material/LocalActivityTwoTone';


const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

export interface ProjectTimeChartProps{
  projectGraphDetails: ProjectGraph[];
}

const ProjectTimeChart: FC<ProjectTimeChartProps> = ({ projectGraphDetails }) => {
  const theme = useTheme();

  const chartSeries = projectGraphDetails.map((prj) => {
    return Math.round((prj.projectPercent + Number.EPSILON) * 100) / 100
  });

  const activeProjectItem = projectGraphDetails.map((prj) => {
    return prj.projectName
  });

  const colorSeries = [
    '#ff9900', '#1c81c2', '#CC6633', '#5c6ac0', '#CCCCCC',
    '#CC6678', '#5c6ab4', '#CCCCBB', '#ff9955', '#1c81q3', 
    '#ff9900', '#1c81c2', '#CC6633', '#5c6ac0', '#CCCCCC',
]

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: colorSeries,
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(2)+ '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: activeProjectItem,
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  return (
    <Card>
      <CardHeader title="Top 3 Projects" />
      <Divider />
      <Grid spacing={0} container>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={12}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                />
              </Grid>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: '100%'
                  }}
                >
                  {projectGraphDetails.map((item, index) => (
                    (index < 3) == true ?
                    <ListItem disableGutters key={index}>
                      <ListItemAvatarWrapper>
                        <Avatar>
                          <LocalActivityTwoTone color="primary"/>
                        </Avatar>
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary={item.projectName}
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary={""}
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          {item.projectPercent.toFixed(2)}%
                        </Typography>
                        <Text color="success">+{item.completedActivityPercent.toFixed(2)}%</Text>
                      </Box>
                    </ListItem>
                    : ''
                  ))}

                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProjectTimeChart;
