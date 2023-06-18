import { createSlice } from "@reduxjs/toolkit";

const editdata  = {
    isedit : false,
    editdata :null,
}
const editexpense = createSlice({
    name : 'editdata',
    initialState :  editdata,
    reducers:{
        editmode(state,action){
            console.log(action.payload,'editmode thunk')
            state.isedit = true;
            state.editdata = action.payload;
        },
        closeeditmode(state){
            state.isedit = false;
            state.editdata = null;
        }
    }
})

export const editAction = editexpense.actions;

export default editexpense.reducer;