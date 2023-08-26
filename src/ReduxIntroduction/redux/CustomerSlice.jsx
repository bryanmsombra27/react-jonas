const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}
const types = {
    createCustomer: "customer/create",
    updateName: "customer/update"
}

const CustomerReducer = (state = initialStateCustomer, action) => {

    switch (action.type) {

        case types.createCustomer:
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: new Date().toISOString()
            }
        case types.updateName:
            return {
                ...state,
                fullName: action.payload
            }

        default:
            return state;
    }

}


//ACTION CREATORS
export const createCustomer = (fullName, nationalID) => {
    return {
        type: types.createCustomer,
        payload: {
            fullName,
            nationalID
        }
    }
}
export const updateName = (fullName) => {
    return {
        type: types.updateName,
        payload: fullName,

    }
}

export default CustomerReducer;

