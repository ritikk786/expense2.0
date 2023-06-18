import { createSlice } from "@reduxjs/toolkit";
const loginInitialstate = {
    islogin : false,
    email : null,
    idToken : null,
    name : null,
}
const userlogin = createSlice({
    name : 'userlogin',
    initialState : loginInitialstate,
    reducers : {
        loginmange (state,action){
            console.log(action)
            state.islogin = true;
            state.email = action.payload.useremail;
            state.idToken = action.payload.useridToken;
            state.name = action.payload.username;
        },
        logouthandler(state,action){
            state.islogin = false;
            state.email = null;
            state.idToken = null;
            state.name = null;
        }
    }
})

export const userloginAction = userlogin.actions;

export default userlogin.reducer;