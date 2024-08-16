import {Alert, Button, Col, Row, Stack, Form} from 'react-bootstrap'
import {AuthContext} from '../context/authContext.jsx'
import { useContext } from 'react'  ;

const Register = () => {
    const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext)

    return (<Form onSubmit={registerUser}>
        <Row className = 'register-form link-light text-decoration-none'>
            <Col xs = {6}>
                <Stack gap = {3}>
                    <h2 style={{
                        textAlign: 'center'
                    }}>Welcome to ChatApp</h2>
                    <Form.Control type = 'text' placeholder='Email'
                        onChange={(e) => updateRegisterInfo({...registerInfo, email: e.target.value})}
                    />
                    <Form.Control type = 'text' placeholder='Name' 
                        onChange={(e) => updateRegisterInfo({...registerInfo, name: e.target.value})}
                    />
                    <Form.Control type = 'text' placeholder='Username'
                        onChange={(e) => updateRegisterInfo({...registerInfo, username: e.target.value})}
                    />
                    <Form.Control type = 'password' placeholder='Password'
                        onChange={(e) => updateRegisterInfo({...registerInfo, password: e.target.value})}
                    />
                    {/* <Form.Control type = 'password' placeholder='Confirm password'/> */}
                    <Button variant='primary' type = 'submit'>
                        {isRegisterLoading? "Create your account...." : "Register"}
                    </Button>
                    {
                        registerError && (
                            <Alert variant='danger'>
                                <p>{registerError.message}</p>
                            </Alert>
                        )
                    }
                </Stack>
            </Col>
        </Row>
    </Form>);
}

export default Register;