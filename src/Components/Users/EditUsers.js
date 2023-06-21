import React from 'react'
import {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { Dashboard } from '../../Base/Base2'

const Edituser = ({User,setUser}) => {

               const history = useHistory();
             const {Id} = useParams();
             const userdata = User.Id
             const[editId,seteditId]= useState("");
             const[FirstName,setFirstName]= useState("");
             const[LastName,setLastName]= useState("");
             const[email,setemail]= useState("");
             const[role,setrole]= useState("");
             


             useEffect(() => {
              seteditId(userdata.id);
              setFirstName(userdata.FirstName);
              setLastName(userdata.LastName);
              setemail(userdata.email);
              setrole(userdata.role);
    
            },[]);  

            //updation
  const updatedata= async ()=>{
    try{
      const updated={
        FirstName ,
  LastName ,
  email ,
  role
        }

    const response = await fetch(`https://wecode-backend.vercel.app/api/Users/editusers/${Id}`,{
      method:"PUT",
      body : JSON.stringify(updated),
      headers: {
       "Content-Type":"application/json"
      },
     });
     const Userdata = await response.json();

    
const editstud= User.findIndex((stud)=>stud.id===editId)

User[editstud]=updated;
setUser([...User]);
setFirstName("")
setLastName("")
setemail("")
 setrole("")
 history.push("/userdashboard")


}
catch(error){
console.log(error);
}

}


  return (
    <Dashboard
    title = "Edit Form"
    description= "Edit user detail here">
<div className="input">
         

            <TextField fullWidth label="Enter the First Name" id="fullWidth" onChange={(event)=>setFirstName(event.target.value)} value={FirstName} />

            <TextField fullWidth label="Enter the Last Name" id="fullWidth" onChange={(event)=>setLastName(event.target.value)} value={LastName} />

            <TextField fullWidth label="Enter the email" id="fullWidth" onChange={(event)=>setemail(event.target.value)} value={email}/>

            <TextField fullWidth label="Enter the role" id="fullWidth" onChange={(event)=>setrole(event.target.value)} value={role} />

           <Button className="add-btn" onClick={()=>updatedata()} variant="contained" color="primary">UPDATE</Button>
          
            </div>
            </Dashboard>
  )
}

export default Edituser