import React, { useState } from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged, signOut} from 'firebase/auth'
import { Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
const navigate = useNavigate()
 
 const [email,setEmail]= useState('')

 
  const userLogOut = async ()=>{
     await signOut(auth)
     console.log('user sign out')
  }
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'500px'}}>
          <h1>Bienvenido {email} </h1>
      <div>
    <Link to={'/SignIn'}><Button onClick={()=>userLogOut()}>LogOut</Button> </Link>  
      </div>
    
    </div>

  )
}
 
export default Home