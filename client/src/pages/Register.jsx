import {Alert, Button, Col, Row, Stack, Form} from 'react-bootstrap'

const Register = () => {
    return (<Form>
        <Row className = 'register-form link-light text-decoration-none'>
            <Col xs = {6}>
                <Stack gap = {3}>
                    <h2 style={{
                        textAlign: 'center'
                    }}>Welcome to ChatApp</h2>
                    <Form.Control type = 'text' placeholder='Name'/>
                    <Form.Control type = 'email' placeholder='Email'/>
                    <Form.Control type = 'text' placeholder='Username'/>
                    <Form.Control type = 'password' placeholder='Password'/>
                    <Form.Control type = 'password' placeholder='Confirm password'/>
                    <Button variant='primary' type = 'submit'>Register</Button>
                    <Alert variant='danger'>An error occured!</Alert>
                </Stack>
            </Col>
        </Row>
    </Form>);
}

export default Register;