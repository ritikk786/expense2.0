import React, { useEffect } from "react";
import Classes from './Totalexpense.module.css'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
// import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddExpense from "../Expenses/AddExpense";
import Modal from 'react-bootstrap/Modal';
import { spacing } from '@mui/system';
import { useDispatch, useSelector } from "react-redux";
import { editAction } from "../../Store/editexpense";

const Totalexpense = () => {
    const isedit = useSelector((state)=> state.editstate.isedit)
    const expensedata = useSelector((state)=> state.expense.expense)
    const dispatch = useDispatch();

    const totalamount = expensedata.reduce((cur,item)=>
       { return  cur + Number(item.price)}
    ,0)

    const [show, setShow] = useState(false);

  const handleClose = () => {
            setShow(false)
            if(isedit){
                console.log('editmode',isedit)
                dispatch(editAction.closeeditmode())
            }
        
        };
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
  if(isedit){
    setShow(true)
}}
  ,[isedit])
   
    return (
        <div className={Classes.main}>
            <div>
                <h5>Total Spending</h5>
                <Button variant="contained" onClick={handleShow}>ADD EXPENSE<span><AddCircleOutlineRoundedIcon /></span></Button>
            </div>
            <div className={Classes.content}>
                <CurrencyRupeeOutlinedIcon /><span>{totalamount}</span>
            </div>
             <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{isedit ? 'Edit Expense' : 'Add Expense'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <AddExpense/>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                   
                    <Button variant="primary">Add +</Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    )
}
export default Totalexpense;