import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dashboard } from '../../Base/Base2';


const Servicedashboard = ({Servicereqs,setServicereqs}) => {

    const history= useHistory();

 //function for deleting data
 const deletedata= async (Id)=>{
  try{
  const response = await fetch(`https://wecode-backend.vercel.app/api/userRequests/deleteRequests/${Id}`,{
    method:"DELETE",
    headers: {
     "Content-Type":"application/json"
    },
   });
const data = await response.json();

    const removeServicereqs = Servicereqs.filter((Servicereqs)=>Servicereqs._id !== Id);
    setServicereqs(removeServicereqs);
  }catch(error){
    console.log(error);
      } 
  
  
  };
  return (
    <Dashboard
    title = "Servicerequst Details"
    description= "Veiw Servicereqs Details Here"
    >
  <div className="card-container"> 
              {Servicereqs.map((Servicereqs,index)=>(
                       <Card sx={{ maxWidth: 345 }} key ={Servicereqs._id} className="card">
                       <CardContent className="card-comp">
  
                         <Typography gutterBottom variant="h5" component="div">
                         Name : {Servicereqs.name}
                         </Typography>

                         <Typography gutterBottom variant="h5" component="div">
                         email : {Servicereqs.email}
                         </Typography>

                         <Typography variant="body2" color="text.secondary">
                         phoneNumber : {Servicereqs.phoneNumber}
                         </Typography>
  
                         <Typography variant="body2" color="text.secondary">
                         service : {Servicereqs.service}
                         </Typography>
  
  
                       </CardContent>
                       <CardActions className="Cardactions">
                       <Button onClick={()=>history.push(`/user/editServicerequests/${Servicereqs._id}`)} variant="contained" color="secondary">EDIT</Button>
                       <Button onClick={()=>deletedata(Servicereqs._id)}  variant="contained" color="error">DELETE</Button>

                       </CardActions>
                     </Card>
              ))}
        </div>
  
  </Dashboard>
  
  )
}

export default Servicedashboard