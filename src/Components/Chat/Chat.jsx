import React, { useState } from "react";
import { auth, db } from "../../firebase";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Spacer,
  Square,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import "./Chat.scss";
import { addDoc, collection, deleteDoc, doc, FieldValue, serverTimestamp, Timestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Chat = ({messages,dataUser}) => {
  const [valueInput,setValueInput]=useState('')
  const navigate =useNavigate()
 const messagesCollection = collection(db,'messages')
 const user = auth.currentUser
const handleChange = (e)=>{
    const{value}=e.target
    setValueInput(value)
}
console.log(user)

const handleSubmit =  (e)=>{
 e.preventDefault()
 const {uid} = auth.currentUser
 const data =  addDoc(messagesCollection,{uid:uid,text:valueInput,createdAt:Timestamp.now()})
  setValueInput('')
  console.log(data)
}


const deleteMessage = async (id)=>{
   await deleteDoc(doc(db, "messages", id)); 
}

const userLogOut = async ()=>{
  await signOut(auth)
  navigate('/')

}

  return (
    <div >
<Box bg='#38598b' style={{display:'flex',justifyContent:'space-between'}} w='800px' p={4} color='white'
        maxW={{ base: '350px', sm: '600px' }}
>
  
  <Heading> Chat</Heading>
  <Heading><Button bg='white'style={{color:'black'}} onClick={()=>userLogOut()}>Logout</Button></Heading>
</Box>
<Box className="boxOne" bg='#e7eaf6' w='800px' h='400px' p={4} color='white'
maxW={{ base: '350px', sm: '600px' }}>

  {messages.sort((a,b)=>a.createdAt - b.createdAt).map((mes)=>(
    <div className="media-query" style={{maxWidth:'200px'}}>
        {mes.uid === user.uid?
        <div>
            <Wrap style={{display:'flex',alignItems:'center'}}>
          <WrapItem>
          <Avatar
      size='xs'
      bg='teal.500'
    />          <span style={{fontSize:'10px',padding:'5px',color:'black'}}> {user?user.displayName:null}</span> 

          </WrapItem>
          
        </Wrap>
          <Box  style={{borderRadius:'10px'}} bg='#a2a8d3' w='150px' p={2} m='2'  color='white'
        maxW={{ base: '120px', sm: '300px' }}
        > 
       <p style={{fontSize:'17px'}} onClick={()=>deleteMessage(mes.id)}>{mes.text}</p>
      </Box>
        </div>
        
      
      :  <div className="box">
                    <Wrap style={{display:'flex',alignItems:'center'}}>
          <WrapItem>
          <Avatar
      size='xs'
      bg='red.500'
      src='https://bit.ly/tioluwani-kolawole'
    />          <span style={{fontSize:'10px',padding:'5px',color:'black'}}> User </span> 

          </WrapItem>
          
        </Wrap>
        <Box bg=' #113f67' style={{borderRadius:'10px'}}>
            <p style={{padding:'10px'}} onClick={()=>deleteMessage(mes.id)}> {mes.text}</p>
          </Box>
      </div>
            
          
          }

    </div>
  ))}



</Box>
<Box bg='#38598b' w='800px'  p={4} color='white'
        maxW={{ base: '350px', sm: '600px' }}
>
   <form action="" onSubmit={handleSubmit}>
      <Input style={{color:'white'}}  value={valueInput} onChange={handleChange }  size='lg' variant='flushed' placeholder="message"/>
   </form>
</Box>
 
    </div>
  );
};

export default Chat;
