import { border, Button, Center, Input, Stack } from "@chakra-ui/react";
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

const navigate = useNavigate()
  
   const loginWithGoogle = async ()=>{
    const responseGoogle = new GoogleAuthProvider() 
     await signInWithPopup(auth,responseGoogle) 
    navigate('/Home')
 }



  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'500px'}}  >
        {user &&
        <div style={{backgroundColor:'#393e46',width:'800px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <div style={{display:'flex',margin:'30px',height:'100px',justifyContent:'center',alignItems:'center',gap:'80px'}}> 
            <div><img src={chatImage}  style={{width:'100px'}} alt="" /></div>
            <div>
              <h1 style={{fontSize:'40px',color:'#0092ca',fontWeight:'800'}}> Chat App</h1>          
            </div>
          </div>
          <div>
            <p style={{color:'white',fontWeight:'600'}}>La forma más fácil de chatear con personas de todo el mundo</p>
          </div>
          <div style={{width:'500px',display:'flex',justifyContent:'center',margin:'30px'}}>
            <div>
                  <Button style={{backgroundColor:'#0092ca'}} onClick={()=>loginWithGoogle()} className="button" type="submit">Sign in Google</Button> 
            </div>

         </div>
        </div>                         
      }
        
    </div>
  );
};

export default SignIn;
