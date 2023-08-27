import { createSlice } from "@reduxjs/toolkit"


const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState: initialStateAccount,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload,
                state.isLoading = false
        },
        withdraw(state, action) {
            state.balance -= action.payload
        },
        loan: {
            prepare(amount, purpose) {

                return {
                    payload: {
                        amount,
                        purpose
                    }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) {
                    return
                }
                state.loan = action.payload.amount,
                    state.loanPurpose = action.payload.purpose,
                    state.balance += action.payload.amount

            },
        },

        payLoan(state, action) {
            state.balance -= state.loan,
                state.loanPurpose = "",
                state.loan = 0
        },
        isLoading(state, action) {
            state.isLoading = true
        }


    }
})

export const { loan, payLoan, withdraw, isLoading } = accountSlice.actions;

//ACTIONS CREATORS FUNCTIONS
export const deposit = (amount, currency) => {
    if (currency === "USD") {
        return {
            type: "account/deposit",
            payload: amount
        }
    }

    return async (dispatch, getState) => {
        dispatch({
            type: "account/isLoading"
        })
        //API CALL
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const converted = data.rates.USD

        dispatch({
            type: "account/deposit",
            payload: converted
        })

    }


}



//export reducer
export default accountSlice.reducer