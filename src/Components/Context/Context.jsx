import React, { createContext, useContext, useState } from 'react'
const DataContext = createContext()
export const useDataContext = ()=> useContext(DataContext)
const Context = ({children}) => {
    const initialState = {
        email:'',
        displayName:'',
        password:''
      }
    const [userinfo,setUserInfo]= useState(initialState)

    const[state,setState]=useState(true)



  return (
    <DataContext.Provider value ={{
            userinfo,
            setUserInfo,
            initialState,
            state,
            setState
    }}>
       {children}
    </DataContext.Provider>
  )
}

export default Context