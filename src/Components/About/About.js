import React from 'react'
import "./About.css";
import { Dashboard } from '../../Base/Base2';
import withAuthorization from '../../Authorization';
const About = () => {
  return (
    <Dashboard title = "About Us">
 <div className="Main">
      <h2>
        Welcome to Zen CRM app.In this app you can add customer details for your organization as Lead data. 
        you can edit and veiw the data.Here you can also add the data of your Employee.
        they can use to get service requests from customers. 
        The Access control has been added to this app,which prevents employees to delete or modify service requests from app.
        Each role can erform Specific task.
      </h2>
      <h4>contact Us</h4>
        <h3>
          Email : <label>kavinajith412@gmail.com</label>
        </h3>
      </div>
    </Dashboard>
   
  )
}

export default withAuthorization(About);