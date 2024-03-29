import React, { useContext } from 'react'
import './common.css'
import Dashboard from '../Dashboard'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { UserInformation } from '../contexts/AuthContext'
import './Checklists.css'
import moment from 'moment'

const Checklists = () => {
    const { user } = useContext(UserInformation)
    const { data } = useFetch(`/checklist/getCheckListByVendor/${user.vendor._id}`)
    console.log(data);
    return (
        <>
            <div className='panel'>
                <h3 style={{ borderBottom: '1px dashed grey', paddingBottom: '10px' }}>
                    <div>
                        Daily Task Checklist
                    <div style={{float:'right'}}>
                        {moment().format('DD/MMM/YYYY')}
                    </div>
                    </div>
                </h3>
                <table width={'100%'}>
                    <thead>
                        <tr>
                            {/* <th>Sr.</th> */}
                            <th align='left'>Checklist</th>
                            <th align='left'>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data?.map((checklist, index) => (
                            <tr key={checklist._id} >
                                {/* <td className='tabdata'>{index + 1}</td> */}
                                <td style={{ paddingLeft: '5px' }}><Link className='lnk' to={`/todochecklist?checklist=${checklist._id}`}>{checklist.checklist_name}</Link></td>
                                <td style={{ paddingLeft: '5px' }}>{moment(checklist.created_date).format('DD/MM/YYYY')}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Checklists