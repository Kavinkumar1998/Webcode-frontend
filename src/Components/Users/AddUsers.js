import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'

import { useFormik } from 'formik'
import { Dashboard } from '../../Base/Base2';



export const userValidationSchema = yup.object({
  FirstName : yup.string().required("Please fill in  FirstName..."),
  LastName : yup.string().required("Please fill in  LastName..."),
  email : yup.string().required("Please fill in  email..."),
  password : yup.string().required("Please fill in  password..."),
  role : yup.string().required("Please fill in  role..."),
})


const Adduser = ({User,setUser}) => {

 const history = useHistory();

 
 const {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
  initialValues : {
    FirstName : "",
  LastName : "",
  email : "",
  password : "",
  role:""
  },
  validationSchema : userValidationSchema,
  onSubmit : (newUsers) => {
    adddata(newUsers);
  }
})


           //function for adding 
           const adddata = async (newUsers)=>{
        
                  try{
                
                          const response = await fetch("https://wecode-backend.vercel.app/api/Users/adduser",{
                            method:"POST",
                            body : JSON.stringify(newUsers),
                            headers: {
                             "Content-Type":"application/json"
                            },
                           });
            
                          const Sdata = await response.json()
                          console.log(Sdata);
                           
                         setUser([...User,Sdata])
                      
                           history.push("/Userdashboard")
                        
                  
                  }
                  catch(error){
                console.log(error);
                  }
            
              };
   


              return (
                <Dashboard title="Add  User data"
                description="You can Add a New User Data" >
              <div className="input">
                               <form onSubmit={handleSubmit}>
                               <TextField
                           fullWidth label="Enter the First Name" 
                           id="fullWidth" onChange={handleChange} 
                           value={values.FirstName} 
                            name="FirstName"
                            onBlur= {handleBlur}
                            />
                              {touched.FirstName && errors.FirstName? <p style={{color:"red"}}> {errors.FirstName} </p>: ""}
              
                              <TextField
                           fullWidth label="Enter the Last Name" 
                           id="fullWidth" onChange={handleChange} 
                           value={values.LastName} 
                            name="LastName"
                            onBlur= {handleBlur}
                            />
                              {touched.LastName && errors.LastName? <p style={{color:"red"}}> {errors.LastName} </p>: ""}

                              <TextField
                           fullWidth label="Enter the email" 
                           id="fullWidth" onChange={handleChange} 
                           value={values.email} 
                            name="email"
                            onBlur= {handleBlur}
                            />
                              {touched.email && errors.email ? <p style={{color:"red"}}> {errors.email} </p>: ""}
              
                          <TextField
                           fullWidth label="Enter the password"
                            id="fullWidth"
                             onChange={handleChange}
                              value={values.password}
                               name="password"
                               onBlur= {handleBlur}
                               />
                                {touched.password && errors.password ? <p style={{color:"red"}}> {errors.password} </p>: ""}
              
                          <TextField
                           fullWidth label="Enter the role"
                            id="fullWidth" 
                            onChange={handleChange}
                             value={values.role}
                              name="role"
                              onBlur= {handleBlur}
                               />
                                {touched.role && errors.role ? <p style={{color:"red"}}> {errors.role} </p>: ""}
              
                        
              
                            <Button className="add-btn" type="submit" variant="contained" color="success">ADD</Button>
                      
                               </form>
                          </div>
                </Dashboard>
                )
}

export default Adduser