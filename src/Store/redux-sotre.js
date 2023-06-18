import { configureStore } from "@reduxjs/toolkit";
import addexpenseReducer from './addexpense'
import userloginReducer from './uselogin'
import editexpenseReducer from './editexpense'
const Store = configureStore({
    reducer : {
        expense : addexpenseReducer, loginmange:userloginReducer, editstate : editexpenseReducer,
    }
})

export default Store;