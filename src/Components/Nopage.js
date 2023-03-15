import { Button } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom';
import Base from '../Base/Base'

const Nopage = () => {
  const history = useHistory();

  return(
    <Base title="You are out of our Website"
    description="please click the below button to redirect to home">
       <Button 
        variant='outlined'
        color='primary'
        size = "large"
        onClick={()=>history.push("/")}
        >
        Home
        </Button>
    </Base>
  )
}

export default Nopage