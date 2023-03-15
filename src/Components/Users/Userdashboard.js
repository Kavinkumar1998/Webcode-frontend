import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import Base from '../../Base/Base';
import { useHistory } from 'react-router-dom'


const Userdashboard = ({User,setUser}) => {

    const history= useHistory();

 //function for deleting data
 const deletedata= async (Id)=>{
  try{
  const response = await fetch(`https://wecode-backend.vercel.app/api/Users/deleteusers/${Id}`,{
    method:"DELETE",
    headers: {
     "Content-Type":"application/json"
    },
   });
const data = await response.json();

    const removeUser = User.filter((User)=>User._id !== Id);
    setUser(removeUser);
  }catch(error){
    console.log(error);
      } 
  
  
  };
  return (
    <Base
    title = "User Details"
    description= "Veiw User Details Here"
    >
  <div className="card-container"> 
              {User.map((User,index)=>(
                       <Card sx={{ maxWidth: 345 }} key ={User.id} className="card">
                       <CardContent className="card-comp">
  
                         <Typography gutterBottom variant="h5" component="div">
                         First Name : {User.FirstName}
                         </Typography>

                         <Typography gutterBottom variant="h5" component="div">
                         Last Name : {User.LastName}
                         </Typography>

                         <Typography variant="body2" color="text.secondary">
                         email : {User.email}
                         </Typography>
  
                         <Typography variant="body2" color="text.secondary">
                         role : {User.role}
                         </Typography>
  
  
                       </CardContent>
                       <CardActions className="Cardactions">
                       <Button onClick={()=>history.push(`/admin/edituser/${User._id}`)} variant="contained" color="secondary">EDIT</Button>
                       <Button onClick={()=>deletedata(User._id)}  variant="contained" color="error">DELETE</Button>

                       </CardActions>
                     </Card>
              ))}
        </div>
  
  </Base>
  
  )
}

export default Userdashboard