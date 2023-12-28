import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AdminPanelSettings, Checklist, Home, Logout, ManageAccounts, Message, NotificationImportant, Rule, Settings, Task } from '@mui/icons-material';
import './Dashboard.css'
import { Link, Navigate } from 'react-router-dom';
const linkColor = {color:'#5a809c'}
const Dashboard = (props) => {
    const {page} = props
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
                        <ListItemIcon>
                            <ManageAccounts sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link to={'/'} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Manage Profile
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Home sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link to={"/home?params=home"} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Home
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem>
                {/* <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Message sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link to={'/'} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Message
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <NotificationImportant sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link to={'/'} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Notifications
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem> */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Checklist sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link to={"/checklists?params=checklists"} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Checklist
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Task sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link to={'/'} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Tasks
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Rule sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link href={'/'} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Tasks Status
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AdminPanelSettings sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link to={"/admin?params=admin"} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Admin
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Logout sx={{color:'#177bad'}}/>
                        </ListItemIcon>
                        <Link href={'/'} style={linkColor}>
                            <ListItemText primary={
                                // <Typography variant="body1"  color={currentPage === 'home' ? '#5C6AC4' : 'grey'}>
                                <Typography variant="body1"  >
                                    Logout
                                </Typography>
                            } />
                        </Link>
                    </ListItemButton>
                </ListItem>
            </Box>
        </>
    )
    const [component,setComponent] = useState()
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{backgroundColor:'#177bad'}}>
                    <Toolbar>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                                <Avatar sx={{ width: 56, height: 56 }} />
                                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px', paddingBottom: '10px' }}>
                                    <div className='head'>
                                        Hi, Swapnil
                                    </div>
                                    <div className='tagline'>
                                        Welcome to VMS Dashboard
                                    </div>
                                </div>
                            </div>
                        </Typography>
                        <div className='menus'>
                            <Link className={page === 'home'?'links active':'links'} to={"/home?params=home"} ><Home /> Home</Link>
                            {/* <Link className='links' to={"/message?params=message"} > <Message /> Messages</Link> */}
                            {/* <Button color="inherit" startIcon={<Message />} onClick={() => Navigate("/dashboard?params=message")}>Messages</Button> */}
                            {/* <Link className='links' to={"/notifications?params=notifications"} ><NotificationImportant /> Notifications</Link> */}
                            <Link className={page === 'checklists'?'links active':'links'} to={"/checklists?params=checklists"} ><Checklist /> Checklists</Link>
                            <Link className={page === 'tasks'?'links active':'links'} to={"/tasks?params=tasks"} ><Task /> Tasks</Link>
                            <Link className='links' to={"/task-status?params=tasks-status"} ><Rule /> Task Status</Link>
                            <Link className='links' to={"/profile?params=profile"} ><ManageAccounts /> Manage-Profile</Link>
                            <Link className={page === 'admin'?'links active':'links'} to={"/admin?params=admin"} ><AdminPanelSettings /> Admin</Link>
                            <Link className='links' to={"/logout?params=logout"} ><Logout /> Logout</Link>
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
                                <MenuIcon sx={{ fontSize: '35px' }} />
                            </IconButton>
                        </div>
                        <Drawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            {list('right')}
                        </Drawer>
                    </Toolbar>
                </AppBar>
            </Box>
         

        </>
    )

}
export default Dashboard