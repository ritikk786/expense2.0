import React, { useRef, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Classes from './AuthForm.module.css'
import useHook from '../../Hooks/useHook';
import { useNavigate } from 'react-router';
import { userloginAction } from '../../Store/uselogin';
import { useDispatch } from 'react-redux';


 const AuthForm = () => {
  const dispatch = useDispatch();
  //navigaton 
  const navigate = useNavigate();

  const APIKEY = 'AIzaSyAsE7sYP8Q3m1zenmQ1gYVd8NFWaZ3qMuY';
  //custom hook function
  const {sendRequest,isLoading} = useHook();

  //loginstate for signin or up
  const[isLogin, setIsLogin] = useState(true);

  // input values;
  let email = useRef();
  let password = useRef();
  let confirmpassword = useRef();

  // pass. or confirm password state
  const [passwordmatch, setPasswrdmatch] = useState(false);

  // function of checking password match
  const ismatch = ()=>{
    if(password.current.value.trim() === confirmpassword.current.value.trim()){
      setPasswrdmatch(true)
    }
    else{
      setPasswrdmatch(false)
    }
  }
  
    // function of switch to login or signup
  const switchloginsigin = (e)=>{
    e.preventDefault()
    console.log(isLogin)
    setIsLogin((prevState)=> !prevState)
}

// submit handler 
const submithandler = async (e)=>{
  e.preventDefault();

  if(isLogin){
    console.log(email.current.value, password.current.value)
    const savetoLocalstorage = async (data)=>{
      localStorage.setItem('token',data.idToken);
      localStorage.setItem('email',data.email);
      if(data.displayName){
        localStorage.setItem('name',data.displayName)
      }
      dispatch(userloginAction.loginmange({
        useremail : data.email,
        useridToken : data.idToken,
        // username : data.displayName || null,
      }))
    }
    const data = await sendRequest({
      url :`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`,
      method:'POST',
      body: {
          email:email.current.value,
          password:password.current.value,
          returnSecureToken:true,
      }
    },savetoLocalstorage)
    // email.current.value='';
    // password.current.value='';
    navigate('/')
  }
  else{
    if(passwordmatch){
      console.log(email.current.value, password.current.value, confirmpassword.current.value)

      const data = await sendRequest({
        url :`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`,
        method:'POST',
        body: {
            email:email.current.value,
            password:password.current.value,
            returnSecureToken:true,
        }
      })
      
      console.log(data)
      setPasswrdmatch(false)
      alert('sucssfully added new acount')
      email.current.value='';
      password.current.value='';
      confirmpassword.current.value='';
    }
    else{
      alert('Password not match')
    }
  }
}
  return (
    <div className={Classes.container}>
    
    <form onSubmit={submithandler}>
    <div className={Classes.img}>
    <img src='https://m.media-amazon.com/images/I/61AxZXJ1u7L.png' width='30'/>
    </div>
    <Form.Control ref={email} type="email" className='mb-2' placeholder="Enter you email" />
    <Form.Control ref={password} type="password" className='mb-2' placeholder="Enter your password" />
   { !isLogin && <Form.Control ref={confirmpassword} onChange={ismatch} type="password" className='mb-2' placeholder="Confirm your password" />} 

    <div  className={Classes.loginbutton}>
    <Button type='submit'  variant="success" >
      {isLoading && <Spinner animation="border" size="sm" />}
      { !isLoading && isLogin && 'Login'  }
      { !isLoading && !isLogin && 'Signup'  }
      </Button>
    </div>

    <div className={Classes.divider}>OR</div>

    {isLogin &&<p>Forgot password?</p>}
    <div className={Classes.signupbtn}>
    <button onClick={switchloginsigin} >{isLogin ? 'Create new account' : 'already have an account'}</button>
    </div>

    </form>
   
    </div>
  )
}

export default AuthForm;