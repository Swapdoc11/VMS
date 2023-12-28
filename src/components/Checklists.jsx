import React from 'react'
import './common.css'
import Dashboard from '../Dashboard'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const Checklists = () => {
    const {data} = useFetch(`/checklist/getCheckListByVendor/${'6583d2ba5f9b2de2936d99f7'}`)
    console.log(data);
    return (
        <>
            <div className='panel'>
                <h3>Checklist</h3>
                <table>
                    {data?.map((checklist,index)=>(
                        <tr key={checklist._id}><td style={{display:'flex',alignItems:'flex-start',justifyContent:'flex-start'}}>{index+1}</td><td><Link to={`/todochecklist?checklist=${checklist._id}`}>{checklist.checklist_name}</Link></td></tr>

                    ))}
                                                    {/*  this must be an ID */}
                    {/* <tr><td><Link to={'/todochecklist?checklist=dc checklist'}>Check List 2</Link></td></tr>
                                                    {/*  this must be an ID */}
                    {/* <tr><td><Link to={'/todochecklist?checklist=dc checklist'}>Check List 3</Link></td></tr> */}
                                                     {/* this must be an ID */}
                </table>
            </div>
        </>
    )
}

export default Checklists