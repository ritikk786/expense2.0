import React, { useRef } from 'react';
import Classes from './ForgotPassword.module.css'
import { Link } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
const ForgotPassword = ()=>{
    const email = useRef();

    const submithandler = ()=>{
        console.log('submit')
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
                            Find account
                                
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