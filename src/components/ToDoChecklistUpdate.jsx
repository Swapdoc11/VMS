import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { UserInformation } from '../contexts/AuthContext';
import axios from 'axios';
import './common.css'

const ToDoChecklistUpdate = () => {
    const { search } = useLocation();
    const {user} = useContext(UserInformation)
    const [checks, setChecks] = useState([]);
    const queryParams = new URLSearchParams(search);
    const param = queryParams.get('checklist');
    const { data } = useFetch(`/todolist/getToDoListById/${param}`);
    console.log(data);
 
    useEffect(() => {
        // Initialize the checklist state with the provided data
        if(data?.checklist){
            setChecks(data?.checklist?.map(item => ({ ...item,check:item , status: '', comment: '' })));
        }
      }, [data]); // Empty dependency array to ensure this effect runs only once
    
      const submitChecks = async() => {
        const isValid = checks.every((item,index) =>{ 
            return item.status !== ''
        });
        
        if (!isValid) {
          // Display an error message or take appropriate action
          alert('Please select a status for each checklist item.');
          return;
        }
        const statusarray = checks.map((item,index) =>{ 
            if(item.status === 'Working Fine' || item.status === 'Completed' ){
                  return 1  
            }else{
                return 0
            }
        });
        console.log(statusarray);
        // Prepare the data structure before sending to the API
        const count = statusarray.reduce((acc, value) => {
            acc[value]++;
            return acc;
        }, { 0: 0, 1: 0 });
        let status = 'Completed'
        if(count[0]>=count[1]){
            status = 'Not Completed'
        }else{
            status = 'Partialy Completed'
        }
        const formData = {
          vendor: user.vendor._id || '', // Replace with the actual vendor ID
          user: user._id || '', // Replace with the actual user ID
          checklistid:data?._id,
          checklistname:data?.checklist_name,
          todochecklist: checks.map((item) => ({
            check: item.check,
            status: item.status || '',
            comment: item.comment || '',
          })),
          status:status
        };
        // Log or send formData to the API
        console.log(formData);
        try {
            const result = await axios.post(`/todolist/addtodolist/`,formData)
            if(result.data){
                alert(result.data.msg)
            }
        } catch (error) {
            console.log(error);
        }

      };

    const handleStatusChange = (index, status) => {
       console.log("Status "+status+" index "+index);
       const updatedChecks = [...checks];
       console.log(updatedChecks);
        updatedChecks[index].status = status;
        setChecks(updatedChecks);
    };

    const handleCommentChange = (index, comment) => {
        const updatedChecks = [...checks];
        updatedChecks[index].comment = comment;
        setChecks(updatedChecks);
    };
    const isStatusMissing = (status) => !status;
    return (
        <>
            <Dashboard page={'todochecklist'} />
            <div className='container'>
                <h2>To Do Checklist : {data?.checklist_name}</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, marginBottom: '20px' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Sr.</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.checklist?.map((chklist, index) => (
                                // <TableRow key={index} style={{ background: isStatusMissing(checks[index]?.status) ? '#FFEBE6' : 'inherit' }}>
                                <TableRow key={index} >
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left">{chklist}</TableCell>
                                    <TableCell align="left">
                                        <FormControl fullWidth>
                                            <InputLabel>Select Status</InputLabel>
                                            <Select
                                                label="Select Status" 
                                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                            >
                                                <MenuItem value={''}></MenuItem>
                                                <MenuItem value={'Working Fine'}>Working Fine</MenuItem>
                                                <MenuItem value={'Not Working'}>Not Working</MenuItem>
                                                <MenuItem value={'Under Maintainance'}>Under Maintenance</MenuItem>
                                                <MenuItem value={'Completed'}>Completed</MenuItem>
                                                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                                <MenuItem value={'Not Complete'}>Not Complete</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField
                                            label={'Comment'}
                                            onChange={(e) => handleCommentChange(index, e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant='contained' className='sm' onClick={submitChecks}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default ToDoChecklistUpdate