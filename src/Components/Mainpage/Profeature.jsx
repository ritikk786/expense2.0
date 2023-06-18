import React from "react";
import Classes from './Profeature.module.css'
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import Button from '@mui/material/Button';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { ProgressBar } from "react-bootstrap";
const Profeature = ()=>{
    return(
        <div className={Classes.main}>
        <div>
        <h5>Pro User</h5>
        <Button variant="contained" disabled><span>Activate Pro</span> <SecurityOutlinedIcon/>
        <ProgressBar now={90} />;
         </Button>
        </div>
        <div>
        <PriceCheckOutlinedIcon style={{fontSize: '4rem'}}/>
        </div>
    </div>
    )
}
export default Profeature;