import React, { useEffect, useState } from "react";
import Classes from './Profeature.module.css'
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import Button from '@mui/material/Button';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CSV, CSVLink } from 'react-csv'
const Profeature = ()=>{
    const expensedata = useSelector((state)=> state.expense.expense)
    const totalamount = expensedata.reduce((cur,item)=>
    { return  cur + Number(item.price)}
 ,0)
    const [prime,setPrime] = useState(false);
    const [disable, setDisable] = useState(true);
   
    // useEffect(()=>{
    //     if(totalamount>= 10000){
    //         setDisable(false)
    //         console.log('priie state')
    //     }
    // },[totalamount])
    const activatepro = ()=>{
        if(totalamount>= 10000){
            setPrime(true)
        }
        else{
            alert('Complete 10000 rs expense to activate pro')
        }
    }
    return(
        <div className={Classes.main}>
        <div>
        <h5>Pro User</h5>

        {!prime && <Button variant="contained" onClick={activatepro}><span>ACTIVATE PRO</span> <SecurityOutlinedIcon/>
        {/* <ProgressBar now={90} /> */}
         </Button>}
         {prime && <CSVLink data={expensedata} filename={'myData.csv'}><Button variant="contained" ><span>
                        DOWNLOAD DATA
                    </span> <FileDownloadOutlinedIcon/>
        
         </Button></CSVLink>}
        </div>
        <div>
        <PriceCheckOutlinedIcon style={{fontSize: '4rem'}}/>
        </div>
    </div>
    )
}
export default Profeature;