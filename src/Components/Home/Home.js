import React from 'react'
import "./Home.css"
import { Dashboard } from '../../Base/Base2'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const history = useHistory();

  return (
    <Dashboard title = "Home">
        <div className="content">
<span>Welcome to Zen CRM app </span>
    <p>
    Zen CRM's  app makes it easy to access data from anywhere, at any time.
     Add and modify customer information in real time. It is  a technology for managing all your company's relationships and 
     interactions with customers and potential customers.
    </p>
    <button className='button' onClick={()=>{history.push("/employee/addLeads")}}>Get Started</button>
</div>
    </Dashboard>
  )
}

export default Home
