import { Button, Input, Stack } from "@chakra-ui/react";
import { signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import './sign-in.scss'
import chatImage from '../images/chat.png'
const SignIn = () => {
 const initialState = {
    email:'',password:''
 } 
 const [user,setUser]=useState(initialState)
 const [loading,setLoading]=useState(true)

  const navigate=  useNavigate()
   const handleChange = (e)=>{
     const {name,value} = e.target
     setUser({...user,[name]:value})
   }
  
   const loginWithGoogle = async ()=>{
    const responseGoogle = new GoogleAuthProvider() 
     await signInWithPopup(auth,responseGoogle) 
    navigate('/Home')
 }

    const handleSumbit = async (e)=>{
     try {
        e.preventDefault()
            const data = 
            await loginWithGoogle()
              /* signInWithEmailAndPassword(auth,user.email,user.password) */
            setUser(initialState)
            setLoading(true)
            navigate('/Home')
     } catch (error) {
      if(error.code === 'auth/user-not-found')
      alert('Este usuario no existe, por favor registrate')
     }
    }


  return (
    <div className="container-SignIn" >
     
        {user &&
        <div>
      <form className="form-SignIn"
       onSubmit={handleSumbit}
        action=""
      >
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', width:'300px',gap:'40px'}}>
          <div>
                <h1 style={{fontWeight:800,fontSize:'25px'}}>Chat App</h1>
          </div>
          <div>
           <img src={chatImage} style={{width:'40px'}} alt="" />
          </div>
          
        </div>
        <div >
             <h2 className="title-SignIn" >Iniciar Sesion</h2>
        </div>
   
        <div className="header-form" >
          <div>
           <p className="parrafo-header-form" > ¿No tienes una cuenta?</p> 
          </div>
          <div >
         <NavLink to={'/SingUp'}>  <p className="parrafo-header-form-register" >Registrate</p></NavLink>
          </div>
        </div>
        <div>
          <Stack>
              <Input
              variant = 'flushed'
            type="text"
            value={user.email}
            name='email'
            placeholder="email"
            required
            onChange={handleChange}
          />
          </Stack>
        
        </div>
      
        <div>
          <Stack>
            <Input
              variant = 'flushed'
            value={user.password}
            name="password"
            type="password"
            required
            placeholder="password"
            onChange={handleChange}
          />
        </Stack>
        </div>
{/*         {loading? <p>loading</p>:null}
 */}        <div className="div-button" >
           <Button style={{margin:'10px'}} className="button" type="submit">Iniciar Sesion</Button>
                 <Button onClick={()=>loginWithGoogle()} className="button" type="submit">Sign in Google</Button>

        </div>
      </form>

      </div>
     
      }
        
    </div>
  );
};

export default SignIn;
