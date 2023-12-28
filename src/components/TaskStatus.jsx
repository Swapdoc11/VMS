
import { Check } from '@mui/icons-material'
import React from 'react'
import './common.css'
import { Link } from 'react-router-dom'
const TaskStatus = () => {
    return (
        <>
                <div className='panel'>
                <h3>Task Assigned for the Day - Status</h3>
                <table>
                    <tr><td><Link to={'/todochecklist?checklist=dc checklist'}>Task Status 1</Link></td></tr>
                                                    {/*  this must be an ID */}
                    <tr><td><Link to={'/todochecklist?checklist=dc checklist'}>Task Status 2</Link></td></tr>
                                                    {/*  this must be an ID */}
                    <tr><td><Link to={'/todochecklist?checklist=dc checklist'}>Task Status 3</Link></td></tr>
                                                    {/*  this must be an ID */}
                </table>
            </div>
          
        </>
    )
}

export default TaskStatus