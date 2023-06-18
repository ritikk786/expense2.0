import React from "react";
import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import Classes from './Profile.module.css'
import Button from '@mui/material/Button';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';


const Profile = () => {
    return (
        <>
            <div className={Classes.main}>
                <div>
                    <h5>Welcome Ritik</h5>
                   {/* <button>Update email</button> */}
                   <Button variant="contained">Update profile <span><SettingsSuggestIcon/></span></Button>
                </div>

                <div>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 56, height: 56 }}
                    />
                </div>

            </div>

        </>
    )
}
export default Profile;