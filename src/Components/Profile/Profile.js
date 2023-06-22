import React from 'react'
import { IconButton, Typography } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import "./Profile.css";
import withAuthorization from '../../Authorization';
import { Dashboard } from '../../Base/Base2';



 const Profile = () => {

  return (
    <Dashboard title="Profile">

<div className="profile">
<IconButton color="inherit">
            <AccountCircleRoundedIcon sx={{fontSize:60}} /> 

            </IconButton>
      <Typography  sx={{fontWeight:"Bold"}} component="h1"  variant="h6">Name: {localStorage.getItem('Name')}</Typography>
      <Typography  sx={{fontWeight:"Bold"}}  component="h1"  variant="h6">Email: {localStorage.getItem('Email')}</Typography>
      <Typography  sx={{fontWeight:"Bold"}}  component="h1"  variant="h6">Role: {localStorage.getItem('role')}</Typography>
      
      </div>
        </Dashboard>
  )
}
export default withAuthorization(Profile);
