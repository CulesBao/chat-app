import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import React, { useEffect } from 'react';
import Chat from './pages/Chat.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NavBar from './components/NavBar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from './context/authContext.jsx'
import { ChatContextProvider } from './context/chatContext.jsx';

function App() {
    const {user} = useContext(AuthContext)
    return (
      <ChatContextProvider user={user}>
        <NavBar/>
        <Container className='text-primary'>
          <Routes>
            <Route path='/chat' element={user ? <Chat/> : <Navigate to='/login'/>}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to='/chat'/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<Navigate to='/' />}/>
          </Routes>
        </Container>
      </ChatContextProvider>
    )
}

export default App
