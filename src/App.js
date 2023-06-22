import './App.css';
import {  Route} from "react-router-dom";
import { SignupPage } from './Components/Signup';
import { Loginpage } from './Components/Login';
import { Forgetpassword } from './Components/Forgotpassword';
import { Verifyotp } from './Components/Verifyotp';
import { EmailVerification } from './Components/Emailverification';
import { NewPassword} from './Components/Newpassword';
import { useEffect, useState } from 'react';

import Adduser from './Components/Users/AddUsers.js';
import Edituser from './Components/Users/EditUsers';
import Userdashboard from './Components/Users/Userdashboard';
import Addleads from './Components/Leads/Addleads';
import Editleads from './Components/Leads/Editleads';
import Leaddashboard from './Components/Leads/Leaddashboard';
import AddServicerequests from './Components/serviceRequests/Addservice';
import EditServicereqs from './Components/serviceRequests/Editservice';


import { Dashboard } from './Base/Base2';
import Servicedashboard from './Components/serviceRequests/Servicedashboard';
import Profile from './Components/Profile/Profile';
import About from './Components/About/About';
import Home from './Components/Home/Home';


function App() {

const[User,setUser]= useState([]);

const[Leads,setLeads]= useState([]);

const[Servicereqs,setServicereqs]= useState([]);

useEffect(() => {
  const getUser= async()=>{
    try{
      const response= await fetch("https://wecode-backend.vercel.app/api/Users/allUsers",{
        method : "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data= await response.json();
      setUser(data);
    }
    catch(error){
console.log(error);
    }
  };
  getUser();
},[]);

useEffect(() => {
  const getLeads= async()=>{
    try{
      const response= await fetch("https://wecode-backend.vercel.app/api/Leads/allLeads",{
        method : "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data= await response.json();
      setLeads(data);
    }
    catch(error){
console.log(error);
    }
  };
  getLeads();
},[]);


useEffect(() => {
  const getServicereqs= async()=>{
    try{
      const response= await fetch("https://wecode-backend.vercel.app/api/userRequests/allRequests",{
        method : "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data= await response.json();
      setServicereqs(data);
    }
    catch(error){
console.log(error);
    }
  };
  getServicereqs();
},[]);


  return (
    <div className="App">

<Route exact path = "/">
<Loginpage/>
    </Route>
   

<Route path = "/signup">
       <SignupPage/>
     </Route>
   
     <Route path = "/forgetpassword">
     <Forgetpassword/>
     </Route>
   
     <Route path = "/verifyotp">
     <Verifyotp/>
     </Route>

     <Route path = "/mailverification">
     <EmailVerification/>
     </Route>

     <Route path = "/setpassword">
     <NewPassword/>
     </Route>
   
     <Route path = "/admin/adduser">
       <Adduser
       User={User}
       setUser={setUser}/>
     </Route>

     <Route path = "/admin/edituser/:Id">
       <Edituser
       User={User}
       setUser={setUser}/>
     </Route>

     <Route path = "/admin/userdashboard">
       <Userdashboard
       User={User}
       setUser={setUser}/>
     </Route>


     <Route path = "/employee/addLeads">
       <Addleads
    Leads={Leads}
       setLeads={setLeads}/>
     </Route>

     <Route path = "/employee/editLeads/:Id">
       <Editleads
    Leads={Leads}
       setLeads={setLeads}/>
     </Route>

     <Route path = "/employee/Leaddashboard">
       <Leaddashboard
    Leads={Leads}
       setLeads={setLeads}/>
     </Route>

     <Route path = "/user/addServicerequests">
       <AddServicerequests
      Servicereqs={Servicereqs}
       setServicereqs={setServicereqs}/>
     </Route>

     <Route path = "/user/editServicerequests/:Id">
       <EditServicereqs
      Servicereqs={Servicereqs}
       setServicereqs={setServicereqs}/>
     </Route>

     <Route path = "/user/servicerequests">
       <Servicedashboard
      Servicereqs={Servicereqs}
       setServicereqs={setServicereqs}/>
     </Route>


     <Route path = "/Profile">
     <Profile/>
     </Route>
     

     <Route path = "/About">
     <About/>
     </Route>

     
     <Route path = "/Home">
     <Home/>
     </Route>
  

    </div>
  );
}

export default App;
