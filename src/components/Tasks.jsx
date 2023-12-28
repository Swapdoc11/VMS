import React from 'react'
import './common.css'
import { Link } from 'react-router-dom'
const Tasks = () => {
    return (
        <>    <div className='panel'>
        <h3>Tasks Assigned for the Day</h3>
        <table>
            <tr><td><Link to={'/todochecklist?checklist=dc checklist'}>Task 1</Link></td></tr>
                                            {/*  this must be an ID */}
            <tr><td><Link to={'/todochecklist?checklist=dc checklist'}>Task 2</Link></td></tr>
                                            {/*  this must be an ID */}
            <tr><td><Link to={'/todochecklist?checklist=dc checklist'}>Task 3</Link></td></tr>
                                            {/*  this must be an ID */}
        </table>
    </div>
        </>
    )
}

export default Tasks