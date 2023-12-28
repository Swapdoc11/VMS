
import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import './common.css'
import { Button, Chip, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AddChecklist = () => {
    
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
    const submitChecklist = async() =>{
        const id = '6583d36ae02439fef5bc772c'
        let checklist = {}
        checklist.user = id
        checklist.checklist_name = chklistName
        checklist.checklist = descriptions
        console.log(checklist);
        try {
            const result = await axios.post('/checklist/addCheckList',checklist)
            if(result){
                
                alert(result.data.msg)
            }
        } catch (error) {
            if (error?.response?.data?.msg === 'Unauthorize') {
                navigate('/')
            }
        }
    }
    return (
        <>
            <Dashboard page={'checklists'} />
            <div className='container' style={{display:'flex',flexDirection:'column'}}>
                <div className='subContainer'>
                    <h2>Add Checklist</h2>
                    <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', gap: '10px' }}>
                        
                        <TextField label={'Check List Name'} className='xxxl' value={chklistName} onChange={(e) => setChklistName(e.target.value)} />
                        <TextField label={'Add Checklist Item'} className='xxl' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <Button variant='contained' className='xxxl sm' onClick={addDescription} startIcon={<Add />}>Add</Button>
                        {/* <Button variant='contained' className='xxxl sm' startIcon={<Add />}>Create Checklist</Button> */}
                    </div>
                </div>
                <div className='subContainer' style={{ border: '1px solid #177bad', borderRadius: '20px', minHeight: '80px' }}>
                    {descriptions.map((desc, index) => (
                        <Chip key={index} label={desc}
                            onDelete={() => removeDescription(index)}
                            style={{ margin: '5px' }}
                            color='primary'
                        />
                    ))}
                </div>
                <div>

                    <Button variant='contained' className='sm' onClick={()=>submitChecklist()}>Submit Checklist</Button>
                </div>
            </div>
        </>
    )
}

export default AddChecklist