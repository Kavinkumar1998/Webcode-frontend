import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react';
import { useHistory } from 'react-router-dom'
import { Dashboard } from '../../Base/Base2';
import withAuthorization from '../../Authorization';


const Leaddashboard = ({Leads,setLeads}) => {

    const history= useHistory();

 //function for deleting data
 const deletedata= async (Id)=>{
  try{
  const response = await fetch(`https://wecode-backend.vercel.app/api/Leads/deleteLeads/${Id}`,{
    method:"DELETE",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
      "Content-Type":"application/json",
      'role':  localStorage.getItem("role")
    },
   });
const data = await response.json();

    const removeUser = Leads.filter((User)=>User._id !== Id);
    setLeads(removeUser);
    history.go(0);
  }catch(error){
    console.log(error);
      } 
  
  
  };
  return (
    <Dashboard 
    title="Lead Details"
    description="Veiw Lead Data">
  <div className="card-container"> 
              {Leads.map((User,index)=>(
                       <Card sx={{ maxWidth: 345 }} key ={User.id} className="card">
                       <CardContent className="card-comp">
  
                         <Typography gutterBottom variant="h5" component="div">
                        Name : {User.name}
                         </Typography>

                         <Typography gutterBottom variant="h6" component="div">
                         email : {User.email}
                         </Typography>

                         <Typography variant="body3">
                         PhoneNumber : {User.phoneNumber}
                         </Typography>
                         <br/>
                         <Typography variant="body3" >
                         status : {User.status}
                         </Typography>
  
  
                       </CardContent>
                       <CardActions className="Cardactions">
                       <Button onClick={()=>history.push(`/employee/editLeads/${User._id}`)} variant="contained" color="secondary">EDIT</Button>
                       <Button onClick={()=>deletedata(User._id)}  variant="contained" color="error">DELETE</Button>

                       </CardActions>
                     </Card>
              ))}
        </div>
  
  </Dashboard>
  
  )
}

export default withAuthorization(Leaddashboard)