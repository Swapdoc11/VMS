import React, { useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import './ChecklistReport.css'

const ChecklistReport = () => {
    const [date, setDate] = useState()
    const [vendor, setVendor] = useState()
    const [checklist, setChecklist] = useState()
    const url = `/todolist/getToDoListFilter/${date}/${vendor}/${checklist}`
    console.log(url);
    const vendors = useFetch('/vendor/getVendor')
    const checklists = useFetch(`/checklist/getCheckListByVendor/${vendor}`)
    const todochecklist = useFetch(`/todolist/getToDoListFilter/${date}/${vendor}/${checklist}`)
    console.log(todochecklist.data);
    // const {user} = useContext(UserInformation)
    const check_columns = [
        { field: 'check', headerName: 'Check', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'comment', headerName: 'Comment', width: 200 }
    ]
    return (
        <>
            <h3>To Do Checklist Report</h3>
            <div className='reportContainer'>
                <div className='smr'>

                    <TextField type='date' onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className='smr'>
                    <FormControl className='sm' fullWidth>
                        <InputLabel>Vendors</InputLabel>
                        <Select
                            label="Vendors"
                            value={vendor}
                            onChange={(e) => setVendor(e.target.value)}
                            required
                        >
                            {vendors?.data?.map((vend, index) => (
                                <MenuItem key={index} value={vend._id}>{vend.vendor_name}</MenuItem>
                            ))}
                        </Select>
                        {/* <FormHelperText>{errors.vendor}</FormHelperText> */}
                    </FormControl>
                </div>
                <div className='smr'>
                    {!checklists.data ? (<><h3>select Vendor</h3></>) : (<>

                        <FormControl className='sm'  fullWidth>
                            <InputLabel>Checklist</InputLabel>
                            <Select

                                label="Checklist"
                                value={checklist}
                                onChange={(e) => setChecklist(e.target.value)}
                                required
                            >
                                {checklists?.data?.map((check, index) => (
                                    <MenuItem key={index} value={check._id}>{check.checklist_name}</MenuItem>
                                ))}
                            </Select>
                            {/* <FormHelperText>{errors.vendor}</FormHelperText> */}
                        </FormControl>

                    </>)}
                    {/* <TextField label={"Checklist Name"} /> */}
                    {/* <Button variant='contained' startIcon={<Search />}>Search</Button> */}
                </div>
                <div className='report'>
                    {!todochecklist.data ? (<></>) : (<>
                        <DataGrid rows={todochecklist.data.todochecklist} columns={check_columns} getRowId={row => row._id} />
                    </>)}
                </div>
            </div>

        </>
    )
}

export default ChecklistReport