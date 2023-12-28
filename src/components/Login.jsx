import { AppBar, Button, TextField, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import './Login.css'
import { Add } from '@mui/icons-material'
import { UserInformation } from '../contexts/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const users = useContext(UserInformation)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = async () => {
        try {
            const cred = {
                email: email,
                password: password
            }
            const result = await axios.post('/auth/login', cred)
            if (result?.data) {
                alert(result?.data?.msg)
                users.dispatch({ type: 'LOGIN', payload: result?.data?.details})
                navigate('/home')
            }
            console.log(result?.data);
        } catch (error) {
            console.log(error);
        }
        // if (email === "" || password === "") {
        //     alert("Please Enter User and Password")
        // } else {
        //     users.dispatch({ type: 'LOGIN', payload: { user: email, password: password } })
        //     setUser('')
        //     setPassword('')
        // }
    }
    const clearForm = () => {
        setEmail('')
        setPassword('')
    }
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#177bad' }}>
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>

                            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px', paddingBottom: '10px' }}>
                                <div className='head'>
                                    VMS
                                </div>
                                <div className='tagline'>
                                    Welcome to Vendor Management System
                                </div>
                            </div>
                        </div>
                    </Typography>


                </Toolbar>
            </AppBar>
            <div className='container loginContainer' >
                <h2>LOGIN</h2>
                <TextField label={'Email'} type='text' className='textfield xxl' value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label={'Password'} type='password' className='textfield xxl' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant='contained' className='btn' onClick={login}>Login</Button>
                <Button variant='contained' className='btn' onClick={clearForm}>Cancel</Button>
            </div>
        </>
    )
}

export default Login