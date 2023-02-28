
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import { ChakraProvider } from '@chakra-ui/react'
import Context from './Components/Context/Context'
import Login from './Components/Login/Login'
import SignIn from './Components/SignIn/SignIn'
import SignUp from './Components/SignUp/SignUp'

function App() {
return(
  <>
  <ChakraProvider>
    <Context>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Login/>}/>  
  <Route path='/Home' element={<Home/>}/>  
  <Route path='/SignIn' element={<SignIn/>}/> 
  <Route path='/SingUp' element={<SignUp/>}/>   
  </Routes>
  </BrowserRouter> 

  
    </Context>
   
  </ChakraProvider>
  
  
  </>
)
}
export default App
