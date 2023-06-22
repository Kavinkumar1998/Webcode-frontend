import React from 'react'
import {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import { Dashboard } from '../../Base/Base2'
import * as yup from 'yup'
import { useFormik } from 'formik'
import withAuthorization from '../../Authorization'


export const userValidationSchema = yup.object({
  name : yup.string().required("Please fill in  Name..."),
  email : yup.string().required("Please fill in  email..."),
  phoneNumber : yup.string().required("Please fill in  phone number..."),
  status : yup.string().required("Please fill in  status..."),
})


const Editleads = ({Leads,setLeads}) => {

               const history = useHistory();
             const {Id} = useParams();
             const Leadsdata =Leads.find(obj=>obj._id === Id);
             console.log(Leadsdata)
             const[editId,seteditId]= useState("");
             const[name,setname]= useState("");
             const[email,setemail]= useState("");
             const[phoneNumber,setphoneNumber]= useState("");
             const[status,setstatus]= useState("");
             


             useEffect(() => {
              seteditId(Leadsdata._id);
              setname(Leadsdata.name);
              setemail(Leadsdata.email);
              console.log(Leadsdata.email)
              setphoneNumber(Leadsdata.phoneNumber);
              setstatus(Leadsdata.phoneNumber);
    
            },[]);  

            const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
              initialValues : {
                name :Leadsdata.name,
              email : Leadsdata.email,
              phoneNumber : Leadsdata.phoneNumber,
              status:Leadsdata.status
              },
              validationSchema : userValidationSchema,
              onSubmit :async (values) => {
                const data = await fetch(`https://wecode-backend.vercel.app/api/Leads/editLead/${Id}`,{
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
      const editstud= Leads.findIndex((stud)=>stud.id===editId)
      Leads[editstud]=(values);
      setLeads([...Leads]);
      setname("")
      setemail("")
       setphoneNumber("")
       setstatus("");
       console.log("saved")
       history.push("/employee/Leaddashboard")
history.go(0);
     }
              }
            })
            //updation

  return (
    <Dashboard>
<div className="input">

                  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="main-box"  >
          <Typography    sx={{fontWeight:"Bold","@media(max-width: 480px)":{
            fontSize:"16px"
          }}}  component="h1" variant="h5"> Edit Lead Details </Typography>
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
             Edit Leads
            </Button>
          </Box>
        </Box>

      </Container>
                 
            </div>
            </Dashboard>
  )
}


export default withAuthorization(Editleads);