import { Button } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { Dashboard } from '../../Base/Base2';

const Nopage = () => {
  const history = useHistory();

  return(
    <Dashboard title="You are out of our Website"
    description="please click the below button to redirect to home">
       <Button 
        variant='outlined'
        color='primary'
        size = "large"
        onClick={()=>history.push("/")}
        >
        Home
        </Button>
    </Dashboard>
  )
}

export default Nopage