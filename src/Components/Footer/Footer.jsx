import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Classes from './Footer.module.css'
const Footer = ()=>{
    return (
        <footer className={Classes.footer}>
            <div>
                <h6>created by Ritik Kumar</h6>
            </div>
            {/* <div>
                <a href='https://www.instagram/__ritik786'><InstagramIcon/></a>
                <a href='https://www.linkedin/ritikk786'><LinkedInIcon/></a>
            </div> */}
           
        </footer>
    )
}
export default Footer;