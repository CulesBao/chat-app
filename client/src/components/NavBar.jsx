import {Container, Nav, Navbar, Stack} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'

const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Navbar className='mb-4' bg='dark'>
            <Container>
                <h2>
                    <Link to='/' className='link-light text-decoration-none'>
                        ChatApp
                    </Link>
                </h2>
                <Nav>
                    <Stack direction='horizontal' gap={3}>
                        {user ? (
                            <>
                                <span className='text-light'>
                                    {user.name}
                                </span>
                                <Link 
                                    to='/login' 
                                    onClick={logoutUser} 
                                    className='link-light text-decoration-none'>
                                    Sign Out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to='/login' 
                                    className='link-light text-decoration-none'>
                                    Login
                                </Link>
                                <Link 
                                    to='/register' 
                                    className='link-light text-decoration-none'>
                                    Register
                                </Link>
                            </>
                        )}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    )
}
 
export default NavBar;