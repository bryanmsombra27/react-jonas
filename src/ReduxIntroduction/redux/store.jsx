import { applyMiddleware, combineReducers, createStore } from "redux"
import AccountReducer from "./AccountSlice"
import CustomerReducer from "./CustomerSlice"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"


thunk
//combining reducers
const rootReducer = combineReducers({
    account: AccountReducer,
    customer: CustomerReducer
})

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk)))





export default store