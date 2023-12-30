// import React, { useEffect, useState } from 'react'
// import Dashboard from '../Dashboard'
// import { useLocation } from 'react-router-dom';
// import { Button, TextField } from '@mui/material';
// import './common.css'
// import { Add, Cancel } from '@mui/icons-material';
// const AddChecklistUpdate = () => {
//     const location = useLocation();
//     const [checklist, setChecklist] = useState()
//     const receivedData = location.state;
//     useEffect(() => {
//         setChecklist(receivedData)

//     }, [receivedData])

//     return (
//         <>
//             <Dashboard page={'checklists'} />
//             <div className='container' style={{gap:'10px'}}>
//                 <div>
//                     <h2>Update Checklist</h2>
//                 </div>
//                 <div>
//                     <TextField value={checklist?.checklist_name} onChange={(e) => setChecklist({ ...checklist, checklist_name: e.target.value })} />
//                     <table border={'1px solid grey'} cellPadding={'10px'}>
//                         <thead>
//                             <tr><td>Sr</td><td>Checks</td><td>Delete</td></tr>
//                         </thead>
//                         <tbody>
//                             {checklist?.checklist?.map((check, index) => (

//                                 <tr>
//                                     <td>{index}</td>
//                                     <td><TextField variant='standard' value={checklist?.checklist[index]} onChange={(e)=>setChecklist({...checklist,checklist:[...check,e.target.value]})} /></td>
//                                     <td><Button><Cancel color='error'/></Button></td>
//                                 </tr>
//                             ))}

//                         </tbody>
//                     </table>
//                     <Button variant='contained' className='xxxl sm' startIcon={<Add />}>Add</Button>
//                 </div>

//             </div>

//         </>
//     )
// }

// export default AddChecklistUpdate
import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard';
import { useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Add, Cancel, Update } from '@mui/icons-material';
import axios from 'axios';

const AddChecklistUpdate = () => {
  const location = useLocation();
  const [checklist, setChecklist] = useState({
    checklist_name: '',
    checklist: [],
  });

  const receivedData = location.state;

  useEffect(() => {
    if (receivedData) {
      setChecklist(receivedData);
    }
  }, [receivedData]);

  const handleCheckChange = (index, value) => {
    const updatedChecklist = [...checklist.checklist];
    updatedChecklist[index] = value;
    setChecklist({ ...checklist, checklist: updatedChecklist });
  };

  const handleDeleteCheck = (index) => {
    const updatedChecklist = [...checklist.checklist];
    updatedChecklist.splice(index, 1);
    setChecklist({ ...checklist, checklist: updatedChecklist });
  };

  const handleAddCheck = () => {
    setChecklist({
      ...checklist,
      checklist: [...checklist.checklist, ''], // Add an empty string or default value
    });
  };
  console.log(checklist);
  const updateChecklist = async() =>{
    try {
        const result = await axios.put(`/checklist/updateCheckList/${checklist._id}`,checklist)
        if(result?.data){
            alert(result.data.msg)
        }
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <>
      <Dashboard page={'checklists'} />
      <div className='container' style={{ gap: '10px' }}>
        <div>
          <h2>Update Checklist</h2>
        </div>
        <div>
          <TextField
            value={checklist?.checklist_name}
            onChange={(e) =>
              setChecklist({ ...checklist, checklist_name: e.target.value })
            }
          />
          <table  border= '1px solid grey' cellPadding= '10px' >
            <thead>
              <tr>
                <td>Sr</td>
                <td>Checks</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {checklist?.checklist.map((check, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <TextField variant='standard' value={check} onChange={(e) => handleCheckChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <Button onClick={() => handleDeleteCheck(index)}>
                      <Cancel color='error' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{display:'flex', gap:'10px'}}>
            <Button variant='contained' className='xxxl sm' startIcon={<Add />} onClick={handleAddCheck}> Add </Button>
            <Button variant='contained' className='xxxl sm' startIcon={<Update />} onClick={updateChecklist}> Update Checklist </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChecklistUpdate;
