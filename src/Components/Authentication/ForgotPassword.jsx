import React, { useRef } from 'react';
import Classes from './ForgotPassword.module.css'
import { Link } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form, Spinner } from 'react-bootstrap';
import useHook from '../../Hooks/useHook';
const ForgotPassword = ()=>{
    const email = useRef();
    const {sendRequest,isLoading} = useHook();

    const submithandler =  (e)=>{
        e.preventDefault()
        const sucess = (data)=>{
            alert(`code sent to ${data.email}`)
        }
         sendRequest({
            url : 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAsE7sYP8Q3m1zenmQ1gYVd8NFWaZ3qMuY',
            method : 'POST',
            body : {
                requestType :  'PASSWORD_RESET',
                email : email.current.value,
            }
        },sucess)
        
        email.current.value='';
        
    }
    return (
       <div className={Classes.container}>
        <div className={Classes.box}>
            <Card className={`${Classes.card} shadow-lg`}>
                <Card.Body>
                    <Card.Title className={Classes.title}><h3>Find Your Account</h3>
                    </Card.Title>
                    <Card.Text> enter your email for reset your password </Card.Text>
                    <form className={Classes.form} onSubmit={submithandler} >
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" ref={email} placeholder="name@example.com" required/>
                        </FloatingLabel>
                       
                        <div className='d-grid gap-2'>
                            <Button className="btn btn-success" style={{borderRadius:'20px'}} type="submit"  >
                            {isLoading && <Spinner animation="border" size="sm" />}
                            {!isLoading && 'Find you account'}
                            </Button>
                        </div>
                       
                    </form>
                    <Link to='/' className={Classes.loginlink}>Login</Link>
                </Card.Body>
            </Card>
        </div>
    </div> 
    )
}
export default ForgotPassword;