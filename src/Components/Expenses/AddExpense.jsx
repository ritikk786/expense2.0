import React, { useEffect, useRef, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addexpenseAction } from '../../Store/addexpense';
import useHook from '../../Hooks/useHook';
import { Spinner } from 'react-bootstrap';

const AddExpense = () => {
    const {sendRequest,isLoading} = useHook();
    const isedit = useSelector((state)=> state.editstate.isedit)
    const editExpensedata = useSelector((state)=> state.editstate.editdata)
    console.log(editExpensedata,'data for edit')
    const expensedata = useSelector((state)=> state.expense.expense)
    const useremail = useSelector((state)=> state.loginmange.email)
    const description = useRef();
    const price = useRef();
    const category = useRef();
    const date = useRef();
    const dispatch = useDispatch();
    const [btnName, setBtnName]= useState('Submit');
    
    useEffect(()=>{
        if(isedit){
            description.current.value = editExpensedata.description;
            price.current.value = editExpensedata.price;
            category.current.value = editExpensedata.category;
            date.current.value = editExpensedata.date;

            setBtnName('Save')
        }
    },[editExpensedata,isedit])

    const submithandler = (e)=>{
        e.preventDefault();
        console.log(description.current.value,price.current.value,category.current.value,date.current.value)
        const useremailroute = useremail.replace('@','').replace('.','')
        const descriptionvalue = description.current.value;
        const pricevalue = price.current.value;
        const categoryvalue = category.current.value;
        const datevalue = date.current.value;
        const savedata = (data)=>{
            const newData = {
                id: data.name,
                description: descriptionvalue,
                price : pricevalue,
                category : categoryvalue,
                date : datevalue,
            }
            dispatch(addexpenseAction.addexpensedata([...expensedata,newData]))
        }

        const editdata = (data)=>{
            const newData = {
                id: editExpensedata.id,
                description: descriptionvalue,
                price : pricevalue,
                category : categoryvalue,
                date : datevalue,
            }
            dispatch(addexpenseAction.editeexpense(newData))
        }
        if(isedit){
            
            console.log(editExpensedata.category,editExpensedata.description,editExpensedata.id,editExpensedata.date,editExpensedata.price)
            
            dispatch(addexpenseAction.deletedata(editExpensedata.id))
            sendRequest({
                url : `https://expense2data-default-rtdb.firebaseio.com/expense/${useremailroute}/${editExpensedata.id}.json`,
                method: 'PUT',
                body : {
                   
                    description: descriptionvalue,
                    price : pricevalue,
                    category : categoryvalue,
                    date : datevalue,
                }
            },editdata)


        }
        else{

            sendRequest({
                url : `https://expense2data-default-rtdb.firebaseio.com/expense/${useremailroute}.json`,
                method: 'POST',
                body : {
                    id: Math.random(),
                    description: descriptionvalue,
                    price : pricevalue,
                    category : categoryvalue,
                    date : datevalue,
                }
            },savedata)
        }
        
        description.current.value='';
        price.current.value='';
        category.current.value='';
        date.current.value='';
    }

    return (
        <div>
            <form onSubmit={submithandler}>
            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Description</Form.Label>
                <Form.Control placeholder="Enter description of expense" required ref={description}/>
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' ref={price} required/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>category</Form.Label>
                    <Form.Select defaultValue="Choose..." ref={category} required>
                        <option>Choose...</option>
                        <option>Petrol</option>
                        <option>Food</option>
                        <option>Shoping</option>
                        <option>etc..</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type='date' ref={date} required/>
                </Form.Group>
            </Row>
            <Button variant="contained" type='submit'>{!isLoading ? btnName : <Spinner animation="border" size="sm" />}</Button>
            </form>
        </div>
    )
}
export default AddExpense;