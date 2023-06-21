import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Dashboard } from '../../Base/Base2'



export const userValidationSchema = yup.object({
  name : yup.string().required("Please fill in  Name..."),
  email : yup.string().required("Please fill in  email..."),
  phoneNumber : yup.string().required("Please fill in  phone number..."),
  service : yup.string().required("Please fill in  role..."),
})


const AddServicerequests = ({Servicereqs,setServicereqs}) => {

 const history = useHistory();

 
 const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
  initialValues : {
    name : "",
  email : "",
  phoneNumber : "",
  service:""
  },
  validationSchema : userValidationSchema,
  onSubmit : (newServicereqs) => {
    adddata(newServicereqs);
  }
})


           //function for adding 
           const adddata = async (newServicereqs)=>{
        
                  try{
                
                          const response = await fetch("https://wecode-backend.vercel.app/api/userRequests/addRequest",{
                            method:"POST",
                            body : JSON.stringify(newServicereqs),
                            headers: {
                             "Content-Type":"application/json"
                            },
                           });
            
                          const Sdata = await response.json()
                          console.log(Sdata);
                           
                         setServicereqs([...Servicereqs,Sdata])
                      
                           history.push("/servicedashboard")
                        
                  
                  }
                  catch(error){
                console.log(error);
                  }
            
              };
   


              return (
                <Dashboard title="Add Service requests"
                description="You can Add a New Service requests Data" >
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
                           fullWidth label="Enter the Service"
                            id="fullWidth" 
                            onChange={handleChange}
                             value={values.service}
                              name="service"
                              onBlur= {handleBlur}
                               />
                                {touched.service && errors.service ? <p style={{color:"red"}}> {errors.service} </p>: ""}
              
                        
              
                            <Button className="add-btn" type="submit" variant="contained" color="success">ADD</Button>
                      
                               </form>
                          </div>
                </Dashboard>
                )
}

export default AddServicerequests 