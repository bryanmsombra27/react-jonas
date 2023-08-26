

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}


const types = {
    deposit: 'account/deposit',
    withdraw: 'account/withdraw',
    loan: 'account/requestLoan',
    payLoan: 'account/payLoan',
    loading: "account/loading",
}



const AccountReducer = (state = initialStateAccount, action) => {

    switch (action.type) {

        case types.deposit:
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false
            }
        case types.withdraw:
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case types.loan:
            if (state.loan > 0) {
                return state
            }
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case types.payLoan:
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }

        case types.loading:
            return {
                ...state,
                isLoading: true
            }

        default:
            return state;
    }

}

//ACTIONS CREATORS FUNCTIONS
export const deposit = (amount, currency) => {
    if (currency === "USD") {
        return {
            type: types.deposit,
            payload: amount
        }
    }

    return async (dispatch, getState) => {
        dispatch({
            type: types.loading
        })
        //API CALL
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const converted = data.rates.USD

        dispatch({
            type: types.deposit,
            payload: converted
        })

    }


}
export const withdraw = (amount) => {
    return {
        type: types.withdraw,
        payload: amount
    }
}
export const loan = (amount, purpose) => {
    return {
        type: types.loan,
        payload: {
            amount,
            purpose
        }
    }
}
export const payLoan = () => {
    return {
        type: types.payLoan,
    }
}


export default AccountReducer