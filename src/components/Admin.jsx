
import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import './common.css'
import Createuser from './Createuser'
import { Box, Button, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Lock, ManageAccounts, Person, Report, Storefront } from '@mui/icons-material'
import Access from './Access'
import Createvendor from './Createvendor'
import ChecklistReport from '../Reports/ChecklistReport'
import MenuIcon from '@mui/icons-material/Menu';
import './Admin.css'
const Admin = () => {
    const [comp, setComp] = useState()
    const [state, setState] = useState({ right: false })
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <>
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <ListItem disablePadding>
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <ManageAccounts sx={{ color: '#177bad' }} />
                        </ListItemIcon> */}
                        <Button onClick={() => setComp('createuser')} startIcon={<Person />}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1">
                                    Create User
                                </Typography>
                            } />
                        </Button>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <ManageAccounts sx={{ color: '#177bad' }} />
                        </ListItemIcon> */}
                        <Button onClick={() => setComp('createvendor')} startIcon={<Storefront />}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1">
                                    Create Vendor
                                </Typography>
                            } />
                        </Button>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <ManageAccounts sx={{ color: '#177bad' }} />
                        </ListItemIcon> */}
                        <Button onClick={() => setComp('accessrights')} startIcon={<Lock />}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1">
                                    Access Rights
                                </Typography>
                            } />
                        </Button>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <ManageAccounts sx={{ color: '#177bad' }} />
                        </ListItemIcon> */}
                      <Button onClick={() => setComp('reports')} startIcon={<Report />}> 
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1">
                                    Reports
                                </Typography>
                            } />
                        </Button>
                    </ListItemButton>
                </ListItem>
            </Box>
        </>
    )

    return (
        <>
            <Dashboard page={'admin'} />
            <div className='container'>
                <div className='navpalate'>
                    <h2>Admin </h2> <h2> / </h2>
                    <div className='nav'>
                        <Button onClick={() => setComp('createuser')} startIcon={<Person />}> Create User</Button>
                        <Button onClick={() => setComp('createvendor')} startIcon={<Storefront />}> Create Vendor</Button>
                        <Button onClick={() => setComp('accessrights')} startIcon={<Lock />}> Access Rights</Button>
                        <Button onClick={() => setComp('reports')} startIcon={<Report />}> Reports</Button>
                    </div>
                    <div className='mobile_menu'>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer('right', true)}
                        >
                            <MenuIcon sx={{ fontSize: '35px',color:'#177bad',paddingTop:'5px' }} />
                        </IconButton>
                    </div>
                    <Drawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                    >
                        {list('right')}
                    </Drawer>

                </div>

                {
                    {
                        createvendor: <Createvendor />,
                        createuser: <Createuser />,
                        accessrights: <Access />,
                        reports: <ChecklistReport />
                    }[comp]
                }
            </div>

        </>

    )
}

export default Admin