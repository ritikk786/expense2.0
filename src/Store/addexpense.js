import { createSlice } from "@reduxjs/toolkit";

const initialexpense = {
    expense : []
}
const addexpense = createSlice({
    name : 'addexpense',
    initialState : initialexpense,
    reducers : {
        addexpensedata (state, action){
            console.log(action.payload)
            // state.expense.push(action.payload)
            state.expense = action.payload
        },
        deletedata (state,action){
            console.log(action.payload,'deletedata')
            let filterd = state.expense.filter((item)=>{
                return  item.id !== action.payload
            })
            state.expense = filterd;
        },
        editeexpense (state, action){
            console.log(action.payload,'data in edit function')
            state.expense.push(action.payload)
        }
    }
})
export const addexpenseAction = addexpense.actions;
export default addexpense.reducer;