import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { Link, useHistory } from 'react-router-dom'


const Base = ({title,description,children}) => {
 
const history = useHistory();
 
   const drawerWidth = 200;
 return (
<div>
      <Box sx={{ display: 'flex' }}>
     <CssBaseline />
     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
       <Toolbar>
         <Link onClick={()=>history.push("/signup")}>
         <Typography  variant="h6" noWrap component="div">
         <HomeIcon  />  ADMIN DASHBOARD
         </Typography>
         </Link>
  
         <Link onClick={()=>history.push("/login")}>
         <Typography variant="h6" noWrap component="div">
          <LoginIcon/> LOGIN
         </Typography>
         </Link>

         <Link onClick={()=>history.push("/logout")}>
         <Typography variant="h6" noWrap component="div">
          <LogoutIcon/> LOGOUT
         </Typography>
         </Link>
       </Toolbar>
     </AppBar>
     

     <Drawer className="Drawer"
   
       variant="permanent"
       sx={{
         width: drawerWidth,
         flexShrink: 0,
         [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
       }}
     >
       <Toolbar/>
       <Box sx={{ overflow: 'auto' }}>
         <List>
             
             <ListItem  disablePadding>
               <ListItemButton   onClick={()=>history.push("/admin/adduser")} >
                 <ListItemIcon>
                 <PersonAddIcon/>
                 </ListItemIcon >Add User
                 <ListItemText/>
               </ListItemButton>
             </ListItem>
             
       
             
             <ListItem  disablePadding>
               <ListItemButton onClick={()=>history.push("/admin/userdashboard")}>
                 <ListItemIcon>
                 <ManageAccountsIcon/>
                 </ListItemIcon>User Dashboard
                 <ListItemText/>
               </ListItemButton>
             </ListItem>
           
         </List>
         <Divider />
         <List>
         
             <ListItem  disablePadding>
               <ListItemButton onClick={()=>history.push("/employee/addLeads")}>
                 <ListItemIcon>
                 <PersonAddIcon/>
                 </ListItemIcon>Add Leads
                 <ListItemText/>
               </ListItemButton>
             </ListItem>
             

             
             <ListItem  disablePadding>
               <ListItemButton onClick={()=>history.push("")}>
                 <ListItemIcon>
                 <ManageAccountsIcon/>
                 </ListItemIcon>Lead Dashboard
                 <ListItemText/>
               </ListItemButton>
             </ListItem>
             
         </List>
         <Divider />
         <List>
             
             <ListItem  disablePadding>
               <ListItemButton   onClick={()=>history.push("/user/addServicerequests")} >
                 <ListItemIcon>
                 <PersonAddIcon/>
                 </ListItemIcon >Add Requests
                 <ListItemText/>
               </ListItemButton>
             </ListItem>
             
       
             
             <ListItem  disablePadding>
               <ListItemButton onClick={()=>history.push("/Servicedashboard")}>
                 <ListItemIcon>
                 <ManageAccountsIcon/>
                 </ListItemIcon>Service Dashboard
                 <ListItemText/>
               </ListItemButton>
             </ListItem>
           
         </List>
       </Box>
     </Drawer>
     <Box  className="Component-box" component="main" sx={{ flexGrow: 1, p: 3 }}>
       <Toolbar />
       <Typography paragraph>
    
   <div className="main-component">
           <header>
               <h1 className ="heading">{title}</h1>
           </header>
           <main className="main-segment">
               <h2>{description}</h2>
               <div className="child-segment">
                   {children}
               </div>
           </main>
       </div>
       </Typography>
     </Box>
   </Box>

   </div>
   
 )
}

export default Base