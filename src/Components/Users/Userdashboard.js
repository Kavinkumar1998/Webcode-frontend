import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dashboard } from '../../Base/Base2';
import withAuthorization from '../../Authorization';


const Userdashboard = ({User,setUser}) => {

    const history= useHistory();

 //function for deleting data
 const deletedata= async (Id)=>{
  try{
  const response = await fetch(`https://wecode-backend.vercel.app/api/Users/deleteusers/${Id}`,{
    method:"DELETE",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
       "Content-Type":"application/json",
       'role':  localStorage.getItem("role")
    },
   });
const data = await response.json();

    const removeUser = User.filter((User)=>User._id !== Id);
    setUser(removeUser);
    history.go(0);
  }catch(error){
    console.log(error);
      } 
  
  
  };
  return (
    <Dashboard
    title = "Employee Details"
    description="Veiw Employee Data"
    >
  <div className="card-container"> 
              {User.map((User,index)=>(
                       <Card sx={{ maxWidth: 345 }} key ={User.id} className="card">
                       <CardContent className="card-comp">
  
                         <Typography gutterBottom variant="h5" component="div">
                         First Name : {User.FirstName}
                         </Typography>

                         <Typography gutterBottom variant="h6" component="div">
                         Last Name : {User.LastName}
                         </Typography>

                         <Typography variant="body3" >
                         email : {User.email}
                         </Typography>
                                <br/>
                         <Typography variant="body3" >
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
  
  </Dashboard>
  
  )
}

export default withAuthorization(Userdashboard)