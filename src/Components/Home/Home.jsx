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

 const messagesCollection = collection(db,'messages')


 const getMessages =  ()=>{
 const user=  onSnapshot(collection(db, "messages"), (doc) => {
   setMessages(doc.docs.map((item)=>({...item.data(),id:item.id})))
})


}
   /*  const data = await getDocs(messagesCollection) 
  setMessages(data.docs.map((item)=>({...item.data(),id:item.id})))
   console.log(messages) */

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
  



   const userLogOut = async ()=>{
      await signOut(auth)
   }
 

  console.log(dataUser)

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'500px',marginBottom:'200px'}}>
          <h1>Bienvenido  <p style={{color:'white',fontSize:'40px'}}></p> </h1>
          <Chat messages={messages} dataUser={dataUser}/>
      <div>
    <Link to={'/SignIn'}><Button onClick={()=>userLogOut()}>LogOut</Button> </Link>  
      </div>
    
    </div>

  )
}
 
export default Home