import {Alert, Button, Col, Row, Stack, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authContext.jsx'
import { useContext } from 'react'  ;

const Login = () => {
    const {loginInfo,loginUser,updateLoginInfo, loginError, isLoginLoading} = useContext(AuthContext)
    return (<Form onSubmit={loginUser}>
        <Row className = 'login-form link-light text-decoration-none'>
            <Col xs = {6}>
                <Stack gap = {3}>
                    <h2 style={{
                        textAlign: 'center'
                    }}>Login to ChatApp</h2>
                    <Form.Control type = 'text' placeholder='Username'
                        onChange={(e) => updateLoginInfo({...loginInfo, username: e.target.value})}
                    />
                    <Form.Control type = 'password' placeholder='Password'
                        onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}
                    />
                    <Button variant='primary' type = 'submit'>
                        {isLoginLoading? "Loading...." : "Login"}
                    </Button>
                    {
                        loginError && (
                        <Alert variant='danger'>
                                <p>{loginError.message}</p>
                        </Alert>
                        )
                    }
                    <Stack direction='horizontal' gap = {1} className='link-light text-decoration-none'>
                        Don't have account? 
                        <Link to = '/register'>Register</Link>
                        now!
                    </Stack>
                </Stack>
            </Col>
        </Row>
    </Form>);
}
 
export default Login;