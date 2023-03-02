import React, { useState } from "react";
import { auth, db } from "../../firebase";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spacer,
  Square,
  Text,
} from "@chakra-ui/react";
import "./Chat.scss";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

const Chat = ({messages}) => {
  const [valueInput,setValueInput]=useState('')

 const messagesCollection = collection(db,'messages')
 const user = auth.currentUser

 console.log(user)
const handleChange = (e)=>{
    const{value}=e.target
    setValueInput(value)
}

const handleSubmit =  (e)=>{
 e.preventDefault()
  addDoc(messagesCollection,{text:valueInput})
  setValueInput('')
  console.log(valueInput)
}

const deleteMessage = async (id)=>{
   await deleteDoc(doc(db, "messages", id)); 
}
console.log(messages)


console.log(valueInput)
  return (
    <div className="container-chat">
      <div className="container mt-5 py-5" style={{marginTop:'200px'}}>
        <div className="row" style={{backgroundColor:'black',height:'50px'}}>
 
        </div>
             <div className="row">
                   <div style={{width:'120px' ,height:'500px',backgroundColor:'red'}} className="col-2">
                   users
                   </div>
                   <div style={{width:'300px' ,height:'500px',backgroundColor:'green'}} className="col ">
                      <div style={{overflowY:'scroll',maxHeight:'500px'}}>
                        {messages.map((item)=>(
                          <div>
                             <p>{item.text}</p>
                           <button className="btn btn-danger" onClick={()=>deleteMessage(item.id)}> delete</button>
                          </div>

                          
                        ))}
                    </div>  
                   </div>
                    <form action="" onSubmit={handleSubmit}>
                          <input value={valueInput} type="text"  placeholder="message"  onChange={handleChange}/>
                        </form>
             </div>
      </div>
    </div>
  );
};

export default Chat;
