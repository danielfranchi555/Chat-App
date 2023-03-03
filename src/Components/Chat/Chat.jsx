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
import { addDoc, collection, deleteDoc, doc, FieldValue, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";


const Chat = ({messages,dataUser}) => {
  const [valueInput,setValueInput]=useState('')
 
 const messagesCollection = collection(db,'messages')
 const user = auth.currentUser
const handleChange = (e)=>{
    const{value}=e.target
    setValueInput(value)
}


const handleSubmit =  (e)=>{
 e.preventDefault()
  addDoc(messagesCollection,{text:valueInput,createdAt:serverTimestamp()})
  setValueInput('')
}


const deleteMessage = async (id)=>{
   await deleteDoc(doc(db, "messages", id)); 
}




  return (
    <div className="">
       <Grid
  templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
  gridTemplateRows={'50px 1fr 30px'}
  gridTemplateColumns={'150px 1fr'}
  h='500px'
  w='600px'
  gap='0'
  
  color='blackAlpha.700'
  fontWeight='bold'
>
  <GridItem  bg='#f7f6e7' area={'header'}>
    <Flex>
      <Box p='2'>
        {dataUser && dataUser.email}
      </Box>
      <Spacer/>
      <Box p='1'>
        <Link to={'/SignIn'}><Button bg='#24527a'  onClick={()=>userLogOut()}>LogOut</Button> </Link>  
      </Box>

    </Flex>

  </GridItem>

  <GridItem  bg='#24527a' area={'main'}>
    {messages.map((item)=>(
      <div key={item.id} style={{padding:'20px'}}>
        <Wrap>
          <WrapItem>
          <Center>
            <Avatar size='md'name='Ryan Florence' src='https://bit.ly/ryan-florence'/>
             <span style={{fontSize:'12px',padding:'10px'}}>{dataUser.displayName}</span>
          </Center>  
          </WrapItem>
        </Wrap>
       <div>{
        user ? <p onClick={()=>deleteMessage(item.id)}>{item.text}</p>:
        <p style={{backgroundColor:'black'}} onClick={()=>deleteMessage(item.id)}>{item.text},{item.createdAt}</p>
        }
        
        <p></p>
       </div>
              
        
        </div>
    ))}
  </GridItem>
  <GridItem  area={'footer'}>
    <form onSubmit={handleSubmit} action="">

          <Input h='30px' bg='#f7f6e7' borderRadius='' value={valueInput} onChange={handleChange } placeholder="message"></Input>

    </form>
  </GridItem>
</Grid>
    </div>
  );
};

export default Chat;
