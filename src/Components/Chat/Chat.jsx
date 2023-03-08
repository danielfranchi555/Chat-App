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
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";


const Chat = ({messages,dataUser}) => {
  const [valueInput,setValueInput]=useState('')
 
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
}

  return (
    <div >
<Box bg='#38598b' w='800px' p={4} color='white'
        maxW={{ base: '350px', sm: '600px' }}
>
  
  <Heading> Chat</Heading>
</Box>
<Box bg='#e7eaf6' w='800px' h='400px' p={4} color='white'
maxW={{ base: '350px', sm: '600px' }}>

  {messages.sort((a,b)=>a.createdAt - b.createdAt).map((mes)=>(
    <div className="media-query" style={{maxWidth:'200px'}}>
        {mes.uid === user.uid?
        <div>
            <Wrap style={{display:'flex',alignItems:'center'}}>
          <WrapItem>
          <Avatar
      size='xs'
      name='D'
      src='https://bit.ly/tioluwani-kolawole'
    />          <span style={{fontSize:'10px',padding:'5px',color:'black'}}> {user?user.displayName:null}</span> 

          </WrapItem>
          
        </Wrap>
          <Box  style={{borderRadius:'10px'}} bg='#a2a8d3' w='100%' p={2} m='2'  color='white'
        maxW={{ base: '120px', sm: '300px' }}
        > 
       <p style={{fontSize:'17px'}} onClick={()=>deleteMessage(mes.id)}>{mes.text}</p>
      </Box>
        </div>
        
      
      :
            <Box className="box"  bg=' #113f67'>
            <p style={{padding:'10px'}}> {mes.text}</p>
          </Box>
          
          }

    </div>
  ))}



</Box>
<Box bg='#38598b' w='800px'  p={4} color='white'
        maxW={{ base: '350px', sm: '600px' }}
>
   <form action="" onSubmit={handleSubmit}>
      <Input  value={valueInput} onChange={handleChange }  size='lg' variant='flushed' placeholder="message"/>
   </form>
</Box>



{/*        <Center>
      <Grid
  templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
  gridTemplateRows={'50px 1fr 30px'}
  gridTemplateColumns={'150px 1fr'}
  h='500px'
  w='500px'
  gap='0'
  
  color='blackAlpha.700'
  fontWeight='bold'
>
<GridItem  bg='#0092ca'  area={'header'}
  
  >
    <Flex>
      <Box p='2'>
     </Box>
      <Spacer/>
      <Box p='1'>
        <Link to={'/SignIn'}><Button bg='#222831' style={{color:'white'}}  onClick={()=>userLogOut()}>LogOut</Button> </Link>  
      </Box>
     
    
    </Flex>

  </GridItem>

  <GridItem  className="grid-item" bg='#393e46' area={'main'}
  >       
  {messages.sort((a,b)=>a.createdAt - b.createdAt).map((item)=>(
    <div key={item.id}>
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
                    <span style={{fontSize:'12px'}}> {user?user.createdAt:'null'}</span>
                  </div>
                </div>
                      <p style={{width:'200px',margin:'5px'}} onClick={()=>deleteMessage(item.id)}>{item.text} </p> 
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
  </Center> */}
 
    </div>
  );
};

export default Chat;
