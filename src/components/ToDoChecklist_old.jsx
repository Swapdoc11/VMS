import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { checklists } from '../fakejsondata'
import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import useFetch from '../hooks/useFetch'
const ToDoChecklist = () => {
    const { search } = useLocation()
    const queryParams = new URLSearchParams(search)
    const param = queryParams.get('checklist')
    console.log(param);
    const {data} = useFetch(`/checklist/getCheckListById/${param}`)
    return (
        <>
            <Dashboard page={'todochecklist'} />
            <div className='container'>
                <h2>To Do Checklist</h2>

                <TableContainer component={Paper}>

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Sr.</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.checklist.map((checklist, index) => (
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default ToDoChecklist