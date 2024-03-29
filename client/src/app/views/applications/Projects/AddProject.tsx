import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, CardActions, TextField } from '@mui/material';
import { Project, ProjectStatus } from 'src/app/models/project';
import { ChangeEvent, useState } from 'react';
import agentProject from 'src/app/api/projects';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import {v4 as uuid} from 'uuid';
import { DateTimePicker } from "@material-ui/pickers";


export interface CreateProjectProps {
    className?: string;
    openProjectForm: boolean;
    handleProjectForm: () => void;
    projects: Project[];
  }
  

const CreateProject: React.FC<CreateProjectProps> = ({ openProjectForm, handleProjectForm, projects }) => {
  
    const initialProjectState = {
        id: "",
        name: "",
        description: "",
        activity: [],
        status: 'completed' as ProjectStatus, // used type assertion
        startDate: new Date(),
        endDate: new Date(),
        estimatedCost: 0
    }; 

    const [project, setProject] = useState<Project>(initialProjectState);
    const [_submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    };

    const handleProjectSubmit = () => {
        var data = {
            id: project.id,
            name: project?.name,
            description: project?.description,
            activity: [],
            status: project.status,
            startDate: project.startDate,
            endDate: project.endDate,
            estimatedCost: project.estimatedCost
        };
        data.id = uuid();
        agentProject.Projects.create(data);
        setSubmitted(true);
        handleInputCancel();
        projects.push(data);
        projects.reverse();
    };

    const handleInputCancel = () => {
        handleProjectForm();
        setProject(initialProjectState);
    }

    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [startDate, setStartDate] = React.useState<Date | null>(null);

    const handleEndDate = (date:any) => {
        setEndDate(date);
        project.endDate = date;
    }

    const handleStartDate = (date:any) => {
        setStartDate(date);
        project.startDate = date;
    }
    
    return (
        <>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            hidden={!openProjectForm}
            justifyContent="space-between"
        >
            <div>
                <TextField
                required
                variant="standard"
                id="standard"
                label="Project Title"
                name='name'
                value={project.name}
                onChange={handleInputChange}
                style={{width:'78%'}}
                
                />
            </div>
            <div>
                <DateTimePicker style={{ margin: '0.8%', width: '38%' }}
                    autoOk
                    value={startDate}
                    disablePast
                    onChange={(newValue) => {
                        handleStartDate(newValue);
                    }}
                    label="Start Date"
                    showTodayButton
                />
                <DateTimePicker style={{ margin: '0.8%', width: '38%' }}
                    autoOk
                    value={endDate}
                    disablePast
                    onChange={(newValue) => {
                        handleEndDate(newValue);
                    }}
                    label="End Date"
                    showTodayButton
                />
            </div>
            <div>
                <TextField
                variant="standard"
                id="standard"
                label="Client"
                name='description'
                value={project.description}
                onChange={handleInputChange}
                style={{width:'38%'}}
                
                />
                <TextField
                variant="standard"
                id="standard"
                label="Amount"
                value={project.estimatedCost}
                name='estimatedCost'
                onChange={handleInputChange}
                type="number"
                style={{width:'38%'}}
                
                />
            </div>
            <div>
                <CardActions style={{justifyContent: 'right'}}>
                    <Button 
                        size="large"
                        startIcon={<AddTwoToneIcon />}
                        onClick={handleProjectSubmit}
                    >Submit
                    </Button>
                    <Button 
                        size="large"
                        endIcon={<CancelIcon />}
                        onClick={handleInputCancel}
                    >
                    </Button>
                </CardActions>
            </div>
        </Box>
        </>
    );
  }

  export default CreateProject;


