import React from 'react'
import {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import { Dashboard } from '../../Base/Base2'
import * as yup from 'yup'
import { useFormik } from 'formik';
import withAuthorization from '../../Authorization'


export const userValidationSchema = yup.object({
  FirstName : yup.string().required("Please fill in  FirstName..."),
  LastName : yup.string().required("Please fill in  LastName..."),
  email : yup.string().required("Please fill in  email..."),
  password : yup.string().required("Please fill in  password..."),
  role : yup.string().required("Please fill in  role..."),
})



const Edituser = ({User,setUser}) => {

               const history = useHistory();
             const {Id} = useParams();
             const userdata = User.find(obj=>obj._id === Id);
             const[editId,seteditId]= useState("");
             const[FirstName,setFirstName]= useState("");
             const[LastName,setLastName]= useState("");
             const[email,setemail]= useState("");
             const[password,setpassword]= useState("");
             const[role,setrole]= useState("");
             


             useEffect(() => {
              seteditId(userdata.id);
              setFirstName(userdata.FirstName);
              setLastName(userdata.LastName);
              setemail(userdata.email);
              setpassword(userdata.password);
              setrole(userdata.role);
    
            },[]);  



            const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
              initialValues : {
                FirstName :userdata.FirstName,
                LastName : userdata.LastName,
                email : userdata.email,
                password : userdata.password,
                role:userdata.role
              },
              validationSchema : userValidationSchema,
              onSubmit :async (values) => {
                const data = await fetch(`https://wecode-backend.vercel.app/api/Users/editusers/${Id}`,{
      method:"PUT",
      body : JSON.stringify(values),
      headers: {
        "x-auth-token": localStorage.getItem("token"),
       "Content-Type":"application/json",
       'role':  localStorage.getItem("role")
      },
     });
     const result = await data.json();

     if (data.status === 400) {
      console.log(result)
     } else {
       
const editstud= User.findIndex((stud)=>stud.id===editId)

  User[editstud]=(values); 
   setUser([...User]);
   setFirstName("")
   setLastName("")
   setemail("")
   setpassword("");
  setrole("")
   history.push("/userdashboard")
       console.log("saved")
       history.push("/admin/userdashboard")
       history.go(0);
     }
              }
            })



  return (
    <Dashboard>
<div className="input">
         
                              
<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="main-box"  >
          <Typography    sx={{fontWeight:"Bold","@media(max-width: 480px)":{
            fontSize:"16px"
          }}}  component="h1" variant="h5"> Edit Employee Details </Typography>
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>

                <TextField
                  required
                  fullWidth
                  id="FirstName"
                  label="FirstName"
                  name="FirstName"
                  value={values.FirstName}
                  autoComplete="FirstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.FirstName && errors.FirstName}
                  helperText={touched.FirstName&& errors.FirstName ? errors.FirstName : null}
                />
              </Grid>
                

              <Grid item xs={12}>

             <TextField
              required
              fullWidth
              id="LastName"
              label="LastName"
              name="LastName"
              value={values.LastName}
              autoComplete="LastName"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.LastName && errors.LastName}
              helperText={touched.LastName && errors.LastName ? errors.LastName : null}
                            />
                              </Grid>

              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email ? errors.email : null}
                  
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  helperText={touched.password && errors.password ? errors.password : null}
                  
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="role"
                  label="role"
                  name="role"
                  autoComplete="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && errors.role}
                  helperText={touched.role && errors.role? errors.role : null}
                  
                />
              </Grid>


            </Grid>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,fontWeight:"Bold"}}
            >
             Edit Employee
            </Button>
          </Box>
        </Box>

      </Container>
                 
        
          
            </div>
            </Dashboard>
  )
}

export default withAuthorization(Edituser)