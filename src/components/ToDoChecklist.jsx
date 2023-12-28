// import React, { useState } from 'react'
// import { useLocation, useParams } from 'react-router-dom'
// import Dashboard from '../Dashboard'

// import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
// import useFetch from '../hooks/useFetch'
// const ToDoChecklist = () => {
//     const { search } = useLocation()
//     const [checks,setChecks] = useState()
//     const queryParams = new URLSearchParams(search)
//     const param = queryParams.get('checklist')
//     console.log(param);
//     const {data} = useFetch(`/checklist/getCheckListById/${param}`)
//     const submitChecks = () =>{
//         console.log(checks);    
//     }

//     return (
//         <>
//             <Dashboard page={'todochecklist'} />
//             <div className='container'>
//                 <h2>To Do Checklist</h2>

//                 <TableContainer component={Paper}>

//                     <Table sx={{ minWidth: 650,marginBottom:'20px' }} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell align="left">Sr.</TableCell>
//                                 <TableCell align="left">Description</TableCell>
//                                 <TableCell align="left">Status</TableCell>
//                                 <TableCell align="left">Comment</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {checklists?.map((checklist, index) => (
//                                 <TableRow key={index}><TableCell align="left">{index +1}</TableCell><TableCell align="left">{checklist.description}</TableCell><TableCell align="left">
//                                     <FormControl fullWidth>
//                                         <InputLabel>Select Status</InputLabel>
//                                         <Select label="Select Status" >
//                                             <MenuItem></MenuItem>
//                                             <MenuItem value={'Working Fine'}>Working Fine</MenuItem>
//                                             <MenuItem value={'Not Working'}>Not Working</MenuItem>
//                                             <MenuItem value={'Under Maintainance'}>Under Maintainance</MenuItem>
//                                             <MenuItem value={'Completed'}>Completed</MenuItem>
//                                             <MenuItem value={'In Progress'}>In Progress</MenuItem>
//                                             <MenuItem value={'Not Complete'}>Not Complete</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </TableCell><TableCell align="left"><TextField label={'Comment'} onChange={(e)=>setChecks({...checks,comment:e.target.value})}/></TableCell></TableRow>
//                             ))}
                            
                            {/* {data?.checklist.map((checklist, index) => (
                                <TableRow key={index}><TableCell align="left">{index +1}</TableCell><TableCell align="left">{checklist}</TableCell><TableCell align="left">
                                    <FormControl fullWidth>
                                        <InputLabel>Select Status</InputLabel>
                                        <Select label="Select Status">
                                            <MenuItem></MenuItem>
                                            <MenuItem value={'Working Fine'}>Working Fine</MenuItem>
                                            <MenuItem value={'Not Working'}>Not Working</MenuItem>
                                            <MenuItem value={'Under Maintainance'}>Under Maintainance</MenuItem>
                                            <MenuItem value={'Completed'}>Completed</MenuItem>
                                            <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                            <MenuItem value={'Not Complete'}>Not Complete</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell><TableCell align="left"><TextField label={'Comment'}/></TableCell></TableRow>
                            ))} */}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <Button variant='contained' className='sm' onClick={()=>submitChecks()}>Submit</Button>
//             </div>
//         </>
//     )
// }

// export default ToDoChecklist

import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { UserInformation } from '../contexts/AuthContext';
import { checklists } from '../fakejsondata'
const ToDoChecklist = () => {
    const { search } = useLocation();
    const {user} = useContext(UserInformation)
    const [checks, setChecks] = useState([]);
    const queryParams = new URLSearchParams(search);
    const param = queryParams.get('checklist');
    // const { data } = useFetch(`/checklist/getCheckListById/${param}`);
    useEffect(() => {
        // Initialize the checklist state with the provided data
        setChecks(checklists.map(item => ({ ...item, status: '', comment: '' })));
      }, []); // Empty dependency array to ensure this effect runs only once
    
      const submitChecks = () => {
        const isValid = checks.every((item,index) =>{ 
            return item.status !== ''
        });
        console.log(isValid);
        if (!isValid) {
          // Display an error message or take appropriate action
          alert('Please select a status for each checklist item.');
          return;
        }
        // Prepare the data structure before sending to the API

        const formData = {
          vendor: user.vendor || '', // Replace with the actual vendor ID
          user: user._id || '', // Replace with the actual user ID
          checklist: checks.map((item) => ({
            check: item.description,
            status: item.status || '',
            comment: item.comment || '',
          })),
        };
    
        // Log or send formData to the API
        console.log(formData);
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
                <h2>To Do Checklist</h2>
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
                            {checklists?.map((checklist, index) => (
                                <TableRow key={index} style={{ background: isStatusMissing(checks[index]?.status) ? '#FFEBE6' : 'inherit' }}>
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left">{checklist.description}</TableCell>
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

export default ToDoChecklist;
