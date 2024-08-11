import {Alert, Button, Col, Row, Stack, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Login = () => {
    return (<Form>
        <Row className = 'login-form link-light text-decoration-none'>
            <Col xs = {6}>
                <Stack gap = {3}>
                    <h2 style={{
                        textAlign: 'center'
                    }}>Login to ChatApp</h2>
                    <Form.Control type = 'text' placeholder='Username'/>
                    <Form.Control type = 'password' placeholder='Password'/>
                    <Button variant='primary' type = 'submit'>Register</Button>
                    <Alert variant='danger'>An error occured!</Alert>
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