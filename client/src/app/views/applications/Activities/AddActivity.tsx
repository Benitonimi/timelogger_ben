import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, CardActions, MenuItem, TextField } from '@mui/material';
import { Activity, ActivityStatus } from 'src/app/models/activity';
import { ChangeEvent, useState } from 'react';
import agentActivity from 'src/app/api/activities';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import {v4 as uuid} from 'uuid';
import { DateTimePicker } from "@material-ui/pickers";
import { Project } from 'src/app/models/project';


export interface AddActivityProps {
    className?: string;
    openActivityForm: boolean;
    handleActivityForm: () => void;
    activities:  Activity[];
    projects: Project[];
  }
  

const AddActivity: React.FC<AddActivityProps> = ({ openActivityForm, handleActivityForm, activities, projects }) => {
  
    const initialActivityState = {
        id: "",
        name: "",
        description: "",
        projectId: "",
        status: 'completed' as ActivityStatus,
        project: null,
        totalHours: "",
        startDate: new Date(),
        endDate: new Date()
    }; 

    const [activity, setActivity] = useState<Activity>(initialActivityState);
    const [_submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    };

    const handleActivitySubmit = () => {
        var data = {
            id: activity.id,
            name: activity?.name,
            description: activity?.description,
            projectId: activity.projectId,
            status: activity.status, 
            project: null,
            totalHours: activity.totalHours,
            startDate: new Date(),
            endDate: new Date()
        };
        data.id = uuid();
        console.log(data);
        agentActivity.Activities.create(data);
        setSubmitted(true);
        handleInputCancel();
        activities.push(data);
    };

    const handleInputCancel = () => {
        handleActivityForm();
        setActivity(initialActivityState);
    }

    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [startDate, setStartDate] = React.useState<Date | null>(null);

    const handleEndDate = (date:any) => {
        setEndDate(date);
        activity.endDate = date;
    }

    const handleStartDate = (date:any) => {
        setStartDate(date);
        activity.startDate = date;
    }

    const [selectedProject, setSelectedProject] = useState('');

    const handleProjectChange = (event: any) => {
        setSelectedProject(event.target.value);
        activity.projectId = event.target.value;
        /* const sp = projects.filter(p => p.id === event.target.value);
        //activity.project = sp;
        console.log(activity.project);
        console.log(sp); */
    };
    
    return (
        <>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            hidden={!openActivityForm}
            justifyContent="space-between"
        >
            <div>
                <TextField
                required
                variant="standard"
                id="standard"
                label="Activity Title"
                name='name'
                value={activity.name}
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
                {/* <TextField
                variant="standard"
                id="standard"
                label="Client"
                name='description'
                value={activity.description}
                onChange={handleInputChange}
                style={{width:'38%'}}
                
                /> */}
                <TextField style={{ margin: '0.5%', width: '38.5%' }}
                    id="standard-select-project"
                    select
                    label="Select Project"
                    value={selectedProject}
                    onChange={handleProjectChange}
                    variant="standard"
                >
                    {projects.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                variant="standard"
                id="standard"
                label="Time Spent"
                value={activity.totalHours}
                name='totalHours'
                onChange={handleInputChange}
                type="string"
                style={{width:'38%'}}
                
                />
            </div>
            <div>
                <CardActions style={{justifyContent: 'right'}}>
                    <Button 
                        size="large"
                        startIcon={<AddTwoToneIcon />}
                        onClick={handleActivitySubmit}
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

  export default AddActivity;


