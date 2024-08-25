import {Routes, Route, Navigate} from 'react-router-dom'
import Chat from './pages/Chat.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NavBar from './components/NavBar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from './context/authContext.jsx'

function App() {
    const { user} = useContext(AuthContext)
    return (
      <>
        <NavBar/>
        <Container className='text-primary'>
          <Routes>
            <Route path = '/' element = {user? <Chat/> : <Login/>}/>
            <Route path = '/login' element = {user? <Chat/>: <Login/> }/>
            <Route path = '/register' element = {user? <Chat/> : <Register/>}/>
            <Route path = '*' element = {<Navigate to = "/" />}/>
          </Routes>
        </Container>
      </>
    )
}

export default App
