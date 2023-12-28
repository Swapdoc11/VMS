import React from 'react'
import Checklists from './Checklists'
import Tasks from './Tasks'
import TaskStatus from './TaskStatus'

import './common.css'
import Dashboard from '../Dashboard'
const Home = () => {
    return (
        <>
        <Dashboard page = {'home'}/>
            <div className='container'>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>

                    <Checklists />
                    <Tasks />
                    <TaskStatus />
                    {/* <TaskStatus /> */}
                    {/* <TaskStatus /> */}
                    {/* <TaskStatus /> */}

                </div>
            </div>
        </>
    )
}

export default Home