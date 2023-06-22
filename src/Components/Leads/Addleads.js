import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Dashboard } from '../../Base/Base2'
import withAuthorization from '../../Authorization'


export const userValidationSchema = yup.object({
  name : yup.string().required("Please fill in  Name..."),
  email : yup.string().required("Please fill in  email..."),
  phoneNumber : yup.string().required("Please fill in  phone number..."),
  status : yup.string().required("Please fill in  role..."),
})


const Addleads = ({Leads,setLeads}) => {

 const history = useHistory();

 
 const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
  initialValues : {
    name : "",
  email : "",
  phoneNumber : "",
  status:""
  },
  validationSchema : userValidationSchema,
  onSubmit : (newLeads) => {
    adddata(newLeads);
  }
})


           //function for adding 
           const adddata = async (newLeads)=>{
        
                  try{
                
                          const response = await fetch("https://wecode-backend.vercel.app/api/Leads/addLeadData",{
                            method:"POST",
                            body : JSON.stringify(newLeads),
                            headers: {
                              "x-auth-token": localStorage.getItem("token"),
                              "Content-Type":"application/json",
                              'role':  localStorage.getItem("role")
                            },
                           });
            
                          const Sdata = await response.json()
                          console.log(Sdata);
                           
                         setLeads([...Leads,Sdata])
                      
                           history.push("/employee/Leaddashboard")
                           history.go(0);
                  
                  }
                  catch(error){
                console.log(error);
                  }
            
              };
   


              return (
                <Dashboard title="Add  Lead data"
                description="You can Add a New Lead Data"> 
                  <div className="input">
                  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="main-box"  >
          <Typography    sx={{fontWeight:"Bold","@media(max-width: 480px)":{
            fontSize:"16px"
          }}}  component="h1" variant="h5"> Add Lead Details </Typography>
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>

                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={values.name}
                  autoComplete="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name ? errors.name : null}
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
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : null}
                  
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="status"
                  label="Status"
                  name="status"
                  autoComplete="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.status && errors.status}
                  helperText={touched.status && errors.status ? errors.status : null}
                  
                />
              </Grid>


            </Grid>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,fontWeight:"Bold"}}
            >
             Add Leads
            </Button>
          </Box>
        </Box>

      </Container>
                  </div>
            
                </Dashboard>
                )
}

export default withAuthorization(Addleads); 