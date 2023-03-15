import React from 'react'
import Base from '../../Base/Base'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'


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
                             "Content-Type":"application/json"
                            },
                           });
            
                          const Sdata = await response.json()
                          console.log(Sdata);
                           
                         setLeads([...Leads,Sdata])
                      
                           history.push("/Leaddashboard")
                        
                  
                  }
                  catch(error){
                console.log(error);
                  }
            
              };
   


              return (
                <Base title="Add Leads"
                description="You can Add a New Lead Data" >
              <div className="input">
                               <form onSubmit={handleSubmit}>
                               <TextField
                           fullWidth label="Enter the First Name" 
                           id="fullWidth" onChange={handleChange} 
                           value={values.name} 
                            name="name"
                            onBlur= {handleBlur}
                            />
                              {touched.name && errors.name? <p style={{color:"red"}}> {errors.name} </p>: ""}
              

                              <TextField
                           fullWidth label="Enter the email" 
                           id="fullWidth" onChange={handleChange} 
                           value={values.email} 
                            name="email"
                            onBlur= {handleBlur}
                            />
                              {touched.email && errors.email ? <p style={{color:"red"}}> {errors.email} </p>: ""}
              
                          <TextField
                           fullWidth label="Enter the phoneNumber"
                            id="fullWidth"
                             onChange={handleChange}
                              value={values.phoneNumber}
                               name="phoneNumber"
                               onBlur= {handleBlur}
                               />
                                {touched.phoneNumber && errors.phoneNumber ? <p style={{color:"red"}}> {errors.phoneNumber} </p>: ""}
              
                          <TextField
                           fullWidth label="Enter the status"
                            id="fullWidth" 
                            onChange={handleChange}
                             value={values.status}
                              name="status"
                              onBlur= {handleBlur}
                               />
                                {touched.status && errors.status ? <p style={{color:"red"}}> {errors.status} </p>: ""}
              
                        
              
                            <Button className="add-btn" type="submit" variant="contained" color="success">ADD</Button>
                      
                               </form>
                          </div>
                </Base>
                )
}

export default Addleads