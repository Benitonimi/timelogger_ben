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
import { Project, ProjectStatus } from 'src/app/models/project';
import { SelectChangeEvent } from '@mui/material/Select';
import agentProject from 'src/app/api/projects';

export interface RecentProjectsTableProps {
  className?: string;
  projects: Project[];
}


interface Filters {
  status?: ProjectStatus;
}

const getStatusLabel = (projectStatus: ProjectStatus): JSX.Element => {
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

  const { text, color }: any = map[projectStatus];

  return <Label color={color}>{text}</Label>;
};


const applyFilters = (
  projects: Project[],
  filters: Filters
): Project[] => {
  return projects.filter((project) => {
    let matches = true;

    if (filters.status && project.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  projects: Project[],
  page: number,
  limit: number
): Project[] => {
  return projects.slice(page * limit, page * limit + limit);
};

const RecentProjectsTable: FC<RecentProjectsTableProps> = ({ projects }) => {
  console.log('ProjectLength : ===>' + projects.length);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    []
  );
  const [projectList, setprojectList] = useState(projects);
  const selectedBulkActions = selectedProjects.length > 0;
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

  const handleSelectAllProjects = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProjects(
      event.target.checked
        ? projects.map((project) => project.id)
        : []
    );
  };

  const handleSelectOneProject = (
    _event: ChangeEvent<HTMLInputElement>,
    projectId: string
  ): void => {
    if (!selectedProjects.includes(projectId)) {
      setSelectedProjects((prevSelected) => [
        ...prevSelected,
        projectId
      ]);
    } else {
      setSelectedProjects((prevSelected) =>
        prevSelected.filter((id) => id !== projectId)
      );
    }
  };

  const handleDeleteProject = (projId: string, index: number) => {
    agentProject.Projects.delete(projId);
    console.log("Before: Project Lenght ==> "+ projects.length);
    setprojectList([...projects.splice(index, 1)]);
    projects = projectList.slice();
    console.log("After: Project Lenght ==> "+ projects.length);
  }

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredProjects = applyFilters(projects, filters);
  const paginatedProjects = applyPagination(
    filteredProjects,
    page,
    limit
  );
  const selectedSomeProjects =
    selectedProjects.length > 0 &&
    selectedProjects.length < projects.length;
  const selectedAllProjects =
    selectedProjects.length === projects.length;
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
          title="Recent Projects"
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
                  checked={selectedAllProjects}
                  indeterminate={selectedSomeProjects}
                  onChange={handleSelectAllProjects}
                />
              </TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell align="right">Project Cost</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProjects.map((project, index) => {
              const isProjectSelected = selectedProjects.includes(
                project.id
              );
              return (
                <TableRow
                  hover
                  key={index}
                  selected={isProjectSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isProjectSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneProject(event, project.id)
                      }
                      value={isProjectSelected}
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
                      {project.name}
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
                      {format(new Date(project.startDate), 'MMMM dd yyyy')}
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
                      {format(new Date(project.endDate), 'MMMM dd yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {project.currency}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(project.status)}
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
                      <IconButton onClick={() => handleDeleteProject(project.id, index) }
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
          count={filteredProjects.length}
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

RecentProjectsTable.propTypes = {
  projects: PropTypes.array.isRequired
};

RecentProjectsTable.defaultProps = {
  projects: []
};

export default RecentProjectsTable;
