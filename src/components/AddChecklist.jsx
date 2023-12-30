
import React, { useContext, useState } from 'react'
import Dashboard from '../Dashboard'
import './common.css'
import { Button, Chip, TextField } from '@mui/material'
import { Add, Update } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserInformation } from '../contexts/AuthContext'
import useFetch from '../hooks/useFetch'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
const AddChecklist = () => {
    const { user } = useContext(UserInformation)
    

    const { data, refetch } = useFetch(`/checklist/getCheckListByVendor/${user.vendor._id}`)
    console.log(data);
    const [chklistName, setChklistName] = useState('');
    const [description, setDescription] = useState('');
    const [descriptions, setDescriptions] = useState([]);
    const navigate = useNavigate()

    const addDescription = () => {
        if (description.trim() !== '') {
            setDescriptions((prevDescriptions) => [...prevDescriptions, description]);
            setDescription('');
        }
    };

    const removeDescription = (index) => {
        const newDescriptions = [...descriptions];
        newDescriptions.splice(index, 1);
        setDescriptions(newDescriptions);
    };
    const submitChecklist = async () => {

        let checklist = {}
        checklist.user = user._id
        checklist.vendor = user.vendor._id
        checklist.checklist_name = chklistName
        checklist.checklist = descriptions
        console.log(checklist);
        try {
            const result = await axios.post('/checklist/addCheckList', checklist)
            if (result) {

                alert(result.data.msg)
                refetch(`/checklist/getCheckListByVendor/${user.vendor._id}`)
            }
        } catch (error) {
            if (error?.response?.data?.msg === 'Unauthorize') {
                navigate('/')
            }
        }
    }
    const columns = [
        { field: 'checklist_name', headerName: 'Checklist Name', width: 300 },
        { field: 'user', headerName: 'User', width: 100, renderCell: (params) => params?.row?.user?.name },
        { field: 'vendor', headerName: 'Vendor', width: 100, renderCell: (params) => params?.row?.vendor?.vendor_name },
        { field: 'created_date', headerName: 'Created Date', width: 100, renderCell: (params) => moment(params?.row?.created_date).format('DD/MMM/YYYY') },
        { field: 'action', headerName: 'Update', width: 100, renderCell: (params) => <><Button onClick={()=>navigate('/addchecklistupdate',{state:params?.row})}>{<Update />}</Button></> },
    ]
    return (
        <>
            <Dashboard page={'checklists'} />

            <div className='container fluid' >
                <div className='subContainer'>
                    <div >
                        <h2>Add Checklist</h2>
                        <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', gap: '10px' }}>

                            <TextField label={'Check List Name'} className='xxxl' value={chklistName} onChange={(e) => setChklistName(e.target.value)} size='small' />
                            <TextField label={'Add Checklist Item'} className='xxl' value={description} onChange={(e) => setDescription(e.target.value)} size='small' />
                            <Button variant='contained' className='xxxl sm' onClick={addDescription} startIcon={<Add />}>Add</Button>
                            {/* <Button variant='contained' className='xxxl sm' startIcon={<Add />}>Create Checklist</Button> */}
                        </div>
                    </div>
                    <div style={{ border: '1px solid #177bad', borderRadius: '20px', minHeight: '80px', paddingTop: '20px', marginTop: '10px' }}>
                        {descriptions.map((desc, index) => (
                            <Chip key={index} label={desc}
                                onDelete={() => removeDescription(index)}
                                style={{ margin: '5px' }}
                                color='primary'
                            />
                        ))}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button variant='contained' className='sm' onClick={() => submitChecklist()}>Submit Checklist</Button>
                    </div>
                </div>
                <div className='subContainer'>
                    {!data ? (<><h2>L O A D I N G</h2></>) : (<>
                        <DataGrid rows={data} columns={columns} getRowId={row => row._id} />
                    </>)}
                </div>
            </div>


        </>
    )
}

export default AddChecklist