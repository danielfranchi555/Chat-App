import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Input, Stack } from "@chakra-ui/react";
import { useDataContext } from "../Context/Context";
import chatImage from '../images/chat.png'
import './sign-up.scss'
const SignUp = () => {
  const navigate = useNavigate();
  const { userinfo, setUserInfo, initialState } = useDataContext()
    useDataContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userinfo,[name]:value });
    console.log(name, value);
  };
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
     await createUserWithEmailAndPassword(
        auth,
        userinfo.email,
        userinfo.password,
        userinfo.displayName
      );
    /*   navigate('/Home'); */
      setUserInfo(initialState);
      
      console.log(userinfo);
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        alert("email ya existente");
      } else if (error.code === "auth/invalid-email") {
        alert("email invalid");
      } else if (error.code === "auth/weak-password") {
        alert("error  password");
      }
    }
  };

  return (
    <div
      className="container-SignUp">
      <div>
        
        <form
         className="form-SignUp"
          action=""
          onSubmit={handleSubmit}
        >
        <div className="header-SignUp" >
          <div>
                <h1 className="title-app" >Chat App</h1>
          </div>
          <div>
           <img className="logo-app" src={chatImage}  alt="" />
          </div>
          
        </div>
          <h2 className="title-register" >Registrate</h2>
          <Stack>
            <Input
              variant="flushed"
              type="email"
              placeholder="email"
              value={userinfo.email}
              required
              name="email"
              onChange={handleChange}
            />
          </Stack>
          <Stack>
            <Input
              variant="flushed"
              type="Username"
              placeholder="Username"
              value={userinfo.displayName}
              required
              name="displayName"
              onChange={handleChange}
            />
          </Stack>
          <div>
            <Stack>
              <Input
                variant="flushed"
                type="password"
                placeholder="password"
                value={userinfo.password}
                required
                name="password"
                onChange={handleChange}
              />
            </Stack>
          </div>
          <div className="div-button">
            <Button className="button"  type="submit"> Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
