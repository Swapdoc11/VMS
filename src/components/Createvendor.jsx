import { VerifiedUser } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Createvendor = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ vendor_name: '', email: '' })
    const [errors, setErrors] = useState({
        vendor_name: '',
        email: '',
    })
    const submitUser = async() => {
        try {
            if (validateForm()) {
                const result = await axios.post(`/vendor/addVendor/`,user) 
                if(result.data){

                    setUser({ vendor_name: '', email: '' })
                }

            } 
        } catch (error) {
            if (error?.response?.data?.msg === 'Unauthorize') {
                navigate('/')
            }
        }
    }
    const validateForm = () => {
        const newErrors = {
            vendor_name: "",
            email: ""
        }
        let isValid = true;
        // Validate vendor_name
        if (!user.vendor_name.trim()) {
            newErrors.vendor_name = 'vendor_name is required';
            isValid = false;
        }

        // Validate Email
        if (!user.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        }
        setErrors(newErrors);

        return isValid;
    }
    return (
        <>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <TextField
                    label={'Vendor Name'}
                    value={user.vendor_name}
                    onChange={(e) => setUser({ ...user, vendor_name: e.target.value })}
                    className='sm'
                    required
                    error={Boolean(errors.vendor_name)}
                    helperText={errors.vendor_name}
                    size='small'
                />
                <TextField
                    label={'Email'}
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className='sm'
                    required
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    size='small'
                />
                <Button variant='contained' onClick={() => submitUser()} startIcon={<VerifiedUser />}>Create Vendor</Button>
            </div>
        </>
    )
}

export default Createvendor