import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import './common.css'
import { VerifiedUser } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useFetch from '../hooks/useFetch'
const Createuser = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ name: '', email: '', mobile: '', vendor: '', emp_id: '', designation: '' })
    const [errors, setErrors] = useState({ name: '', email: '', mobile: '', vendor: '', emp_id: '', designation: '' })
    const vendors = useFetch(`/vendor/getVendor`)
    const submitUser = async () => {
        try {
            if (validateForm()) {

                const result = await axios.post(`/auth/register/`,user)
                if(result.data){
                    alert(result.data.msg)
                    setUser({ name: '', email: '', mobile: '', vendor: '', emp_id: '', designation: '' })
                }
            }

        } catch (error) {
            if (error?.response?.data?.msg === 'Unauthorize') {
                navigate('/')
            }
        }
    }
    const validateForm = () => {
        const newErrors = { name: '', email: '', mobile: '', vendor: '', emp_id: '', designation: '' }
        let isValid = true;
        // Validate vendor_name
        if (!user.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        // Validate Email
        if (!user.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        }
        // Validate Mobile
        if (!user.mobile.trim()) {
            newErrors.mobile = 'Mobile is required';
            isValid = false;
        }
        // Validate vendor
        if (!user.vendor.trim()) {
            newErrors.vendor = 'Vendor is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }
    return (
        <>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <TextField label={'Name'} value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className='sm' required error={Boolean(errors.name)} helperText={errors.name} size='small'/>
                <TextField label={'Email'} value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className='sm' required error={Boolean(errors.email)} helperText={errors.email} size='small'/>
                <TextField label={'Mobile'} value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} className='sm' required error={Boolean(errors.mobile)} helperText={errors.mobile} size='small'/>
                {/* <TextField label={'Vendor'} value={user.vendor} onChange={(e)=>setUser({...user,vendor:e.target.value})} className='sm' required error={Boolean(errors.vendor)} helperText={errors.vendor}/> */}
                <FormControl className='sm' error={Boolean(errors.vendor)}  size='small'>
                    <InputLabel>Vendors</InputLabel>
                    <Select
                        label="Vendors"
                        value={user.vendor}
                        onChange={(e)=>setUser({...user,vendor:e.target.value})}
                        required
                    >
                        {vendors?.data?.map((vendor,index)=>(
                            <MenuItem key={index} value={vendor._id}>{vendor.vendor_name}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.vendor}</FormHelperText>
                </FormControl>
                <TextField label={'Employee Id'} value={user?.emp_id} onChange={(e) => setUser({ ...user, emp_id: e.target.value })} className='sm' size='small'/>
                <TextField label={'Designation'} value={user?.designation} onChange={(e) => setUser({ ...user, designation: e.target.value })} className='sm' size='small'/>
                <Button variant='contained' onClick={() => submitUser()} startIcon={<VerifiedUser />}>Create User</Button>
            </div>
        </>
    )
}

export default Createuser