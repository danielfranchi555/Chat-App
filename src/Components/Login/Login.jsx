import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDataContext } from '../Context/Context'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

const Login = () => {
   const {state,setState}=useDataContext()
  return (
    <div>
        {state ?
        <SignIn/>:
      <SignUp/>
    }
        
       
    </div>
  )
}

export default Login