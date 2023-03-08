import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { onAuthStateChanged , signOut} from 'firebase/auth'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Chat from '../Chat/Chat'
import { collection,  onSnapshot } from 'firebase/firestore'

const Home = () => {
  const [messages,setMessages]= useState([])
  const [dataUser,setDataUser]= useState(null)



 const getMessages =  ()=>{
   onSnapshot(collection(db, "messages"), (doc) => {
   setMessages(doc.docs.map((item)=>({...item.data(),id:item.id})))
})


}
 useEffect(()=>{
  getMessages()
 },[])
  
  useEffect(()=>{
     const listen = onAuthStateChanged(auth,(user)=>{
     if(user){
    setDataUser(user)
     }else{
      setDataUser(null)
     }
     return listen()
     })
  },[])
  



  
 
   console.log(dataUser)


  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:'200px'}}>
          <h1>Bienvenido  <p style={{color:'white',fontSize:'40px'}}></p> </h1>
          <Chat messages={messages} dataUser={dataUser}/>
      <div>
      </div>
    
    </div>

  )
}
 
export default Home