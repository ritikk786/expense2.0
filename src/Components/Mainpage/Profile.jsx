import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import Classes from './Profile.module.css'
import Button from '@mui/material/Button';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Modal } from "react-bootstrap";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import { useSelector } from "react-redux";


const Profile = () => {
   
    const Username = useSelector((state)=> state.loginmange.name)
    const profilepicUrl = useSelector((state)=> state.loginmange.propfilepicUrl)

    
    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    
    };
const handleShow = () => setShow(true);



    return (
        <>
            <div className={Classes.main}>
                <div>
                    <h5> <span>{Username==null?'Unknown':`${Username}`}</span></h5>
                   {/* <button>Update email</button> */}
                   <Button variant="contained" onClick={handleShow}>UPDATE PROFILE <span><SettingsSuggestIcon/></span></Button>
                </div>

                <div>
                    <Avatar
                        alt={Username}
                        src={profilepicUrl}
                        // sx={{ width: '4em', height: '4em' }}
                        style={{ width: '4em', height: '4em' }}
                    />
                </div>
                <Modal  
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      <UpdateProfile/>
                </Modal.Body>
               
            </Modal>
            </div>

        </>
    )
}
export default Profile;