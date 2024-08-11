import {Container, Nav, Navbar, Stack} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return ( <Navbar className = 'mb-4' bg = 'dark'>
        <Container>
            <h2>
                <Link to = '/' className='link-light text-decoration-none'>
                    ChatApp
                </Link>
            </h2>
            <Nav>
                <Stack direction='horizontal' gap = {3}>
                    <Link to = '/login' className='link-light text-decoration-none'>
                        Login
                    </Link>
                    <Link to = '/register' className='link-light text-decoration-none'>
                        Register
                    </Link>
                </Stack>
            </Nav>
        </Container>
    </Navbar> );
}
 
export default NavBar;