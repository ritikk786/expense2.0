import { createSlice } from "@reduxjs/toolkit";
const loginInitialstate = {
    islogin : false,
    email : null,
    idToken : null,
    name : null,
    propfilepicUrl : '/static/images/avatar/1.jpg',
}
const userlogin = createSlice({
    name : 'userlogin',
    initialState : loginInitialstate,
    reducers : {
        loginmange (state,action){
            // console.log(action)
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
            state.propfilepicUrl = '/static/images/avatar/1.jpg';
        },
        propfilmanage (state,action){
            // console.log(action.payload)
            state.propfilepicUrl = action.payload;
        },
        displayName (state, action){
            // console.log(action.payload)
            state.name = action.payload
        }
    }
})

export const userloginAction = userlogin.actions;

export default userlogin.reducer;