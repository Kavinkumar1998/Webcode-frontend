import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react';
import { useHistory } from 'react-router-dom'
import { Dashboard } from '../../Base/Base2';


const Leaddashboard = ({Leads,setLeads}) => {

    const history= useHistory();

 //function for deleting data
 const deletedata= async (Id)=>{
  try{
  const response = await fetch(`https://wecode-backend.vercel.app/api/Leads/deleteLeads/${Id}`,{
    method:"DELETE",
    headers: {
     "Content-Type":"application/json"
    },
   });
const data = await response.json();

    const removeUser = Leads.filter((User)=>User._id !== Id);
    setLeads(removeUser);
  }catch(error){
    console.log(error);
      } 
  
  
  };
  return (
    <Dashboard
    title = "Leads"
    description= "Veiw Lead Details Here"
    >
  <div className="card-container"> 
              {Leads.map((User,index)=>(
                       <Card sx={{ maxWidth: 345 }} key ={User.id} className="card">
                       <CardContent className="card-comp">
  
                         <Typography gutterBottom variant="h5" component="div">
                        Name : {User.name}
                         </Typography>

                         <Typography gutterBottom variant="h5" component="div">
                         email : {User.email}
                         </Typography>

                         <Typography variant="body2" color="text.secondary">
                         PhoneNumber : {User.PhoneNumber}
                         </Typography>
  
                         <Typography variant="body2" color="text.secondary">
                         status : {User.status}
                         </Typography>
  
  
                       </CardContent>
                       <CardActions className="Cardactions">
                       <Button onClick={()=>history.push(`/employee/editLeads/${Leads._id}`)} variant="contained" color="secondary">EDIT</Button>
                       <Button onClick={()=>deletedata(Leads._id)}  variant="contained" color="error">DELETE</Button>

                       </CardActions>
                     </Card>
              ))}
        </div>
  
  </Dashboard>
  
  )
}

export default Leaddashboard