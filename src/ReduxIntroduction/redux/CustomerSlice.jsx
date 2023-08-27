import { createSlice } from "@reduxjs/toolkit"

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}
const types = {
    createCustomer: "customer/create",
    updateName: "customer/update"
}
const CustomerSlice = createSlice({
    initialState: initialStateCustomer,
    name: "customer",
    reducers: {

        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createdAt: new Date().toISOString()
                    }
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName,
                    state.nationalID = action.payload.nationalID,
                    state.createdAt = action.payload.createdAt
            }
        },
        updateName(state, action) {
            state.fullName = action.payload
        }
    }
})

export const { updateName, createCustomer } = CustomerSlice.actions

export default CustomerSlice.reducer

