import React from "react";
import { Spinner, Table } from "react-bootstrap";
import Classes from './Table.module.css'
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { Key } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button } from "@mui/material";
import { addexpenseAction } from "../../../Store/addexpense";
import useHook from "../../../Hooks/useHook";
import { editAction } from "../../../Store/editexpense";
const TableData = ()=>{
    const expensedata = useSelector((state)=> state.expense.expense)
    const isedit = useSelector((state)=> state.editstate.isedit)
    const useremail = useSelector((state)=> state.loginmange.email)
    const dispatch = useDispatch();
    const {sendRequest,isLoading} = useHook();
    console.log(expensedata)
    
    // delte function
    const deletedata = (id)=>{
      console.log(id)
      let useremailroute = useremail.replace('@','').replace('.','')
            sendRequest({
                url : `https://expense2data-default-rtdb.firebaseio.com/expense/${useremailroute}/${id}.json`,
                method: 'Delete',
            })
            dispatch(addexpenseAction.deletedata(id))
    }

    // edit function
    const editdata = (item)=>{
      dispatch(editAction.editmode(item))
      console.log(item,isedit)
    }
    return(
        <div className={Classes.container}>
             <Table  bordered hover >
      <thead>
        <tr>
          <th>Sr.No.</th>
          <th>Expense Description</th>
          <th>Expense Category</th>
          <th>Expense Date</th>
          <th>Expense Price</th>
          <th> Edit Expense</th>

        </tr>
      </thead>
      
      <tbody>
      {expensedata.length === 0 && <tr style={{textAlign:'center'}}> <td colSpan={6} ><p>add some expense</p></td></tr>}
        {expensedata.map((item,i)=>
  
          <tr  Key={item.id}>
            <td>{i+1}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>{item.date}</td>
            <td>{item.price}</td>
            <td>
              <Button onClick={()=>editdata(item)}><EditNoteIcon/></Button> &nbsp; / &nbsp;
              <Button onClick={()=>deletedata(item.id)}>
               <DeleteIcon style={{color:'red'}} />
                
                </Button>
             </td>
            </tr>
          
        )}


      </tbody>

    </Table>
        
    
        </div>
    )
}
export default TableData;