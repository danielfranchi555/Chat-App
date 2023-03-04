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
 const {uid} = auth.currentUser
 const data =  addDoc(messagesCollection,{text:valueInput,uid,createdAt:serverTimestamp()})
  setValueInput('')
  console.log(data)
}


console.log(user.displayName)
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
  <GridItem  bg='#0092ca' style={{borderRadius:'10px 10px 0px 0px '}} area={'header'}>
    <Flex>
      <Box p='2'>
     </Box>
      <Spacer/>
      <Box p='1'>
        <Link to={'/SignIn'}><Button bg='#222831' style={{color:'white'}}  onClick={()=>userLogOut()}>LogOut</Button> </Link>  
      </Box>
     
    
    </Flex>

  </GridItem>

  <GridItem  className="grid-item" bg='#393e46' area={'main'} >       
  {messages.map((item)=>(
    <div key={item.id}>
      <span></span>
      <div>
        
        <Wrap >
               {item.uid === user.uid?
               
               <WrapItem style={{display:'flex',flexDirection:'column',marginLeft:'380px',marginTop:'50px',backgroundColor:'#eeeeee',borderRadius:'5px'}}>
                <div style={{display:'flex'}}>
                  <div>
                    <Avatar size='xs'/>
                  </div>
                  <div>
                    <span style={{fontSize:'12px'}}> {user?user.displayName:'null'}</span>
                  </div>
                </div>
                      <p style={{width:'200px',margin:'5px'}} onClick={()=>deleteMessage(item.id)}>{item.text} {/* <Avatar bg='red.500'  size='xs'/>  */}</p> 
               </WrapItem>
          :
          <WrapItem style={{backgroundColor:'#eeeeee',display:'flex',flexDirection:'column',marginLeft:'20px',borderRadius:'5px',marginTop:'20px'}}>
                <div style={{display:'flex'}}>
                  <div>
                    <Avatar size='xs'/>
                  </div>
                  <div>
                    <span style={{fontSize:'12px'}}> {user.displayName}</span>
                  </div>
                </div>
             <p style={{width:'200px',margin:'5px'}} onClick={()=>deleteMessage(item.id)}>{item.text}</p> 
          </WrapItem>
      } 
      </Wrap>
      </div> 
    </div>
     ))

     }
  
  

 




  </GridItem>
  <GridItem  area={'footer'}>
    <form onSubmit={handleSubmit} action="">

          <Input h='30px' bg='#0092ca' style={{color:'white',borderRadius:'0px 0px 10px 10px'}} value={valueInput} onChange={handleChange } placeholder="message"></Input>

    </form>
  </GridItem>
</Grid>
    </div>
  );
};

export default Chat;
