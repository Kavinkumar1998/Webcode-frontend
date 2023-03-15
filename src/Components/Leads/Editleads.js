import React from 'react'
import Base from '../../Base/Base'
import {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const Editleads = ({Leads,setLeads}) => {

               const history = useHistory();
             const {Id} = useParams();
             const Leadsdata = Leads[Id]
             const[editId,seteditId]= useState("");
             const[name,setname]= useState("");
             const[email,setemail]= useState("");
             const[phoneNumber,setphoneNumber]= useState("");
             const[status,setstatus]= useState("");
             


             useEffect(() => {
              seteditId(Leadsdata.id);
              setname(Leadsdata.name);
              setemail(Leadsdata.email);
              setphoneNumber(Leadsdata.phoneNumber);
              setstatus(Leadsdata.status);
    
            },[]);  

            //updation
  const updatedata= async ()=>{
    try{
      const updated={
        name , 
  email ,
  phoneNumber,
  status
        }

    const response = await fetch(`https://wecode-backend.vercel.app/api/Leads/editLead/${Id}`,{
      method:"PUT",
      body : JSON.stringify(updated),
      headers: {
       "Content-Type":"application/json"
      },
     });
     const Leadsdata = await response.json();

    
const editstud= Leads.findIndex((stud)=>stud.id===editId)

Leads[editstud]=updated;
setLeads([...Leads]);
setname("")
setemail("")
 setphoneNumber("")
 setstatus("")
 history.push("/Leadsdashboard")


}
catch(error){
console.log(error);
}

}


  return (
    <Base
    title = "Edit leads Form"
    description= "Edit Leads detail here">
<div className="input">
         

            <TextField fullWidth label="Enter the First Name" id="fullWidth" onChange={(event)=>setname(event.target.value)} value={name} />

            <TextField fullWidth label="Enter the email" id="fullWidth" onChange={(event)=>setemail(event.target.value)} value={email}/>

            <TextField fullWidth label="Enter the phoneNumber" id="fullWidth" onChange={(event)=>setphoneNumber(event.target.value)} value={phoneNumber} />

            <TextField fullWidth label="Enter the status" id="fullWidth" onChange={(event)=>setstatus(event.target.value)} value={status} />

           <Button className="add-btn" onClick={()=>updatedata()} variant="contained" color="primary">UPDATE</Button>
          
            </div>
            </Base>
  )
}

export default Editleads