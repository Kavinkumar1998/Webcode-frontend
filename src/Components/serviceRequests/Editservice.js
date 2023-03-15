import React from 'react'
import Base from '../../Base/Base'
import {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const EditServicereqs = ({Servicereqs,setServicereqs}) => {

               const history = useHistory();
             const {Id} = useParams();
             const Servicereqsdata = Servicereqs.Id
             const[editId,seteditId]= useState("");
             const[name,setname]= useState("");
             const[email,setemail]= useState("");
             const[phoneNumber,setphoneNumber]= useState("");
             const[service,setservice]= useState("");
             


             useEffect(() => {
              seteditId(Servicereqsdata._id);
              setname(Servicereqsdata.name);
              setemail(Servicereqsdata.email);
              setphoneNumber(Servicereqsdata.phoneNumber);
              setservice(Servicereqsdata.service);
    
            },[]);  

            //updation
  const updatedata= async ()=>{
    try{
      const updated={
        name , 
  email ,
  phoneNumber,
  service
        }

    const response = await fetch(`https://wecode-backend.vercel.app/api/userRequests/editRequests/${Id}`,{
      method:"PUT",
      body : JSON.stringify(updated),
      headers: {
       "Content-Type":"application/json"
      },
     });
     const Servicereqsdata = await response.json();

    
const editstud= Servicereqs.findIndex((stud)=>stud.id===editId)

Servicereqs[editstud]=updated;
setServicereqs([...Servicereqs]);
setname("")
setemail("")
 setphoneNumber("")
 setservice("")
 history.push("/Servicereqsdashboard")


}
catch(error){
console.log(error);
}

}


  return (
    <Base
    title = "Edit Servicereqs Form"
    description= "Edit Servicereqs detail here">
<div className="input">
         

            <TextField fullWidth label="Enter the First Name" id="fullWidth" onChange={(event)=>setname(event.target.value)} value={name} />

            <TextField fullWidth label="Enter the email" id="fullWidth" onChange={(event)=>setemail(event.target.value)} value={email}/>

            <TextField fullWidth label="Enter the phoneNumber" id="fullWidth" onChange={(event)=>setphoneNumber(event.target.value)} value={phoneNumber} />

            <TextField fullWidth label="Enter the service" id="fullWidth" onChange={(event)=>setservice(event.target.value)} value={service} />

           <Button className="add-btn" onClick={()=>updatedata()} variant="contained" color="primary">UPDATE</Button>
          
            </div>
            </Base>
  )
}

export default EditServicereqs