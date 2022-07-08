import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
//import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/app/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { Activity, ActivityStatus } from 'src/app/models/activity';
import { SelectChangeEvent } from '@mui/material/Select';

export interface RecentActivitiesTableProps {
  className?: string;
  activities: Activity[];
}


interface Filters {
  status?: ActivityStatus;
}

const getStatusLabel = (activityStatus: ActivityStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[activityStatus];

  return <Label color={color}>{text}</Label>;
};


const applyFilters = (
  activities: Activity[],
  filters: Filters
): Activity[] => {
  return activities.filter((activity) => {
    debugger;
    let matches = true;

    if (filters.status && activity.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  activities: Activity[],
  page: number,
  limit: number
): Activity[] => {
  return activities.slice(page * limit, page * limit + limit);
};

const RecentActivitiesTable: FC<RecentActivitiesTableProps> = ({ activities: activities }) => {
  console.log('ActivityLength : ===>' + activities.length);
  console.log('Activity : ===>' + activities);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedActivities.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  
  const [filters, setFilters] = useState<Filters>({
    status: 'completed'
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (
    e: SelectChangeEvent
    ): void => {
    let value: any = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllActivities = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedActivities(
      event.target.checked
        ? activities.map((activity) => activity.id)
        : []
    );
  };

  const handleSelectOneActivity = (
    _event: ChangeEvent<HTMLInputElement>,
    projectId: string
  ): void => {
    if (!selectedActivities.includes(projectId)) {
      setSelectedActivities((prevSelected) => [
        ...prevSelected,
        projectId
      ]);
    } else {
      setSelectedActivities((prevSelected) =>
        prevSelected.filter((id) => id !== projectId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredActivities = applyFilters(activities, filters);
  const paginatedActivities = applyPagination(
    filteredActivities,
    page,
    limit
  );
  const selectedSomeActivities =
    selectedActivities.length > 0 &&
    selectedActivities.length < activities.length;
  const selectedAllActivities =
    selectedActivities.length === activities.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  autoWidth
                  label="Status"
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Activities"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllActivities}
                  indeterminate={selectedSomeActivities}
                  onChange={handleSelectAllActivities}
                />
              </TableCell>
              <TableCell>Activity Name</TableCell>
              <TableCell>Time Spent</TableCell>
              <TableCell align="right">Date of Work</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedActivities.map((activity) => {
              const isActivitySelected = selectedActivities.includes(
                activity.id
              );
              return (
                <TableRow
                  hover
                  key={activity.id}
                  selected={isActivitySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isActivitySelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneActivity(event, activity.id)
                      }
                      value={isActivitySelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {activity.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {activity.project?.name} 
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {activity.totalHours}{'H'}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {activity.description}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {/* {new Date(activity.startDate).toLocaleDateString('En-en')} */}
                      {format(new Date(activity.startDate), 'MMMM dd yyyy')}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(activity.totalHours).format(
                        `${activity.totalHours}0.00H`
                      )}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(activity.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredActivities.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentActivitiesTable.propTypes = {
  activities: PropTypes.array.isRequired
};

RecentActivitiesTable.defaultProps = {
  activities: []
};

export default RecentActivitiesTable;
