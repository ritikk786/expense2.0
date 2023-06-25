import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { storage } from '../../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { userloginAction } from '../../../Store/uselogin';
import useHook from '../../../Hooks/useHook';
import { Spinner } from 'react-bootstrap';

const UpdateProfile = () => {
    const { sendRequest, isLoading } = useHook();
    const name = useRef();
    const imageinput = useRef();
    const dispatch = useDispatch();
    const [imageUpload, setImageUpload] = useState(null)
    const useremail = useSelector((state)=> state.loginmange.email)
    const AuthidToken = useSelector((state)=> state.loginmange.idToken)
    const [wait, setWait] = useState(false)
    
    const submithandler = async (e)=>{
        const useremailroute = useremail.replace('@','').replace('.','')
        e.preventDefault()
        setWait(true)
        if(name.current.value != null){
            let disname = name.current.value;
            console.log('name ki vlaue hai',disname)

            const setName = (data)=>{
                dispatch(userloginAction.displayName(data.displayName))
                localStorage.setItem('name',data.displayName)
            }
            await sendRequest({
                url : 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsE7sYP8Q3m1zenmQ1gYVd8NFWaZ3qMuY',
                method : 'POST',
                body : {
                    idToken : AuthidToken,
                    displayName : disname,
                    
                    returnSecureToken : true,
                }
            },setName)
           
        }
        if(imageUpload != null){
        //first step
        const imageReft = ref(storage, `profilepic/${useremailroute}`)
        // // second step
       await uploadBytes(imageReft,imageUpload).then((snaphsot)=>{
            getDownloadURL(snaphsot.ref).then((url)=>{
                dispatch(userloginAction.propfilmanage(url))
            })
        })
        .catch((error)=>{
            alert(error)
        })
        console.log('image ki value hai')
    }
    setWait(false)
    name.current.value = '';
    imageinput.current.value = '';
    }
    console.log(wait)
    return (
        <div>
            <Form onSubmit={submithandler}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Profile name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" ref={name}  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload your profile picture</Form.Label>
                    <Form.Control type="file" onChange={(event)=>setImageUpload(event.target.files[0])} ref={imageinput}/>
                </Form.Group>
                <Button variant="contained" type='submit'>
                {!wait ? 'Submit' : <Spinner animation="border" size="sm" />}
                    
                    </Button>
            </Form>

           
        </div>
    )
}
export default UpdateProfile;