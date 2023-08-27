import { configureStore } from "@reduxjs/toolkit"
import AccountReducer from "./AccountSlice"
import CustomerReducer from "./CustomerSlice"


//combine reducers, add thunk, configure redux toolkit automatically
const store = configureStore({
    reducer: {
        account: AccountReducer,
        customer: CustomerReducer
    }
})





export default store