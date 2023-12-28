import { AppBar, Button, TextField, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import './Login.css'
import { Add } from '@mui/icons-material'
import { UserInformation } from '../contexts/AuthContext'
const Login = () => {
    const users = useContext(UserInformation)
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const login =()=> {
        if(user===""||password===""){
            alert("Please Enter User and Password")
        }else{
            users.dispatch({type:'LOGIN',payload:{user:user,password:password}})
            setUser('')
        setPassword('')
        }
    }
    const clearForm = () =>{
        setUser('')
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
                <TextField label={'Username'} type='text' className='textfield xxl' value={user} onChange={(e) => setUser(e.target.value)} />
                <TextField label={'Password'} type='password' className='textfield xxl' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant='contained' className='btn' onClick={login}>Login</Button>
                <Button variant='contained' className='btn' onClick={clearForm}>Cancel</Button>
            </div>
        </>
    )
}

export default Login