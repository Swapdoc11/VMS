
import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import './common.css'
import Createuser from './Createuser'
import { Button } from '@mui/material'
import { Lock, Person, Storefront } from '@mui/icons-material'
import Access from './Access'
import Createvendor from './Createvendor'
const Admin = () => {
    const [comp, setComp] = useState()
    return (
        <>
            <Dashboard page={'admin'} />
            <div className='container'>
                <h2>Admin</h2>
                <div style={{display:'flex',flexWrap:'wrap',marginBottom:'10px',gap:'10px'}}>
                    <Button onClick={() => setComp('createuser')} startIcon={<Person />}> Create User</Button>
                    <Button onClick={() => setComp('createvendor')} startIcon={<Storefront />}> Create Vendor</Button>
                    <Button onClick={() => setComp('accessrights')} startIcon={<Lock />}> Access Rights</Button>
                </div>
                {
                    {
                        createvendor: <Createvendor />,
                        createuser: <Createuser />,
                        accessrights: <Access />
                    }[comp]
                }
            </div>

        </>

    )
}

export default Admin