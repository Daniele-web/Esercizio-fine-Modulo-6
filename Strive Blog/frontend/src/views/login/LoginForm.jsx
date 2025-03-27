import Form from 'react-bootstrap/Form';
import React, { useContext } from "react";
import { Container, Button, Modal } from 'react-bootstrap';
import { login } from '../../data/fetch.js';
import { useState } from 'react';
import { AuthorContext } from '../../context/AuthorContextProvider.jsx';


const LoginForm = props => {
    const { token, setToken } = useContext(AuthorContext)
    const [loginFormValue, setLoginFormValue] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        console.log("sta scrivendo")
        setLoginFormValue({
            ...loginFormValue,
            [event.target.name]: event.target.value
        })
    }

    const handleLogin = async () => {
        try {
            const tokenObj = await login(loginFormValue) 

            if (tokenObj && tokenObj.token) { 
                localStorage.setItem('token', tokenObj.token) 
                setToken(tokenObj.token) 

                if (window.confirm('Continua con la navigazione')) {
                    window.location.href = 'http://localhost:3000/';
                };

            } else {

                alert("Credenziali sbagliate, riprova")
            }
        } catch (error) {
            console.log(error)
            alert(error + 'Errore, riporva più tardi')
        }
    }

    return (
        <Container fluid="sm">
            <Form className="mt-5" >
                <Form.Group className="mt-2" controlId="exampleForm.ControlInput1" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mt-2" controlId="exampleForm.ControlInput1" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} placeholder="***" />
                </Form.Group>
                <Button onClick={handleLogin} className='mt-3'>Login</Button>
            </Form>
        </Container>
    )
}

export default LoginForm;