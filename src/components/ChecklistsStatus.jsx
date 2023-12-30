import React, { useContext } from 'react'
import './common.css'
import Dashboard from '../Dashboard'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { UserInformation } from '../contexts/AuthContext'
import './Checklists.css'
import moment from 'moment'
import { Cancel, CheckCircle, Pending } from '@mui/icons-material'

const ChecklistsStatus = () => {
    const { user } = useContext(UserInformation)
    const { data } = useFetch(`/checklist/getCheckListByVendor/${user.vendor._id}`)
    const todochecklist = useFetch('/todolist/getToDoListToday')
    console.log(data);
    return (
        <>
            <div className='panel'>
                <h3 style={{ borderBottom: '1px dashed grey', paddingBottom: '10px' }}>
                    <div>
                        Daily Task Checklist Status
                        <div style={{ float: 'right' }}>
                            {moment().format('DD/MMM/YYYY')}
                        </div>
                    </div>
                </h3>

                <table width={'100%'}>
                    <thead>
                        <tr>
                            {/* <th>Sr.</th> */}
                            <th align='left'>Checklist</th>
                            <th align='left'>Status</th>
                            <th align='left'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todochecklist?.data?.map((checklist, index) => (
                            <tr key={checklist._id} >
                                {/* <td className='tabdata'>{index + 1}</td> */}
                                <td style={{ paddingLeft: '5px' }}><Link className='lnk' to={`/todochecklistupdate?checklist=${checklist._id}`}>{checklist.checklistname}</Link></td>
                                <td style={{ paddingLeft: '5px' }}>
                                    {
                                    {
                                            Completed:<CheckCircle color='success'/>,
                                            InComplete:<Cancel color='error'/>,
                                            Partialy_Completed:<Pending sx={{color:'orange'}}/>
                                    }[checklist.status]
                                     
                                    
                                    }
                                </td>
                                <td style={{ paddingLeft: '5px' }}>{moment(checklist.created_date).format('DD/MM/YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ChecklistsStatus