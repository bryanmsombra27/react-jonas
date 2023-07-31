export const actions = {
    openAccount:"openAccount",
    deposit:"deposit",
    withdraw:"withdraw",
    loan:"loan",
    payLoan:"payLoan",
    closeAccount:"closeAccount",
}
const depositQuantity  = 150
const withdrawQuantity = 50
const loanQuantity = 5000
const bankReducer = (state ={} , action) =>{

switch(action.type){

case actions.openAccount: 
return {
    ...state,
    isActive:true,
    balance:500
}
case actions.deposit:
    return {
        ...state,
        balance:state.balance + depositQuantity
    }
case actions.withdraw:
    return {
        ...state,
        balance:state.balance - withdrawQuantity
    }
case actions.loan:
    return {
        ...state,
        loan:state.loan == 0 ?  loanQuantity:state.loan,
        balance:state.loan == 0  ? state.balance + loanQuantity:state.balance
    }
case actions.payLoan:
    return {
        ...state,
        loan:0,
        balance:state.loan !==0 ? state.balance - loanQuantity: state.balance
    }
case actions.closeAccount:
    return {
        ...state,
        isActive: state.loan== 0 && state.balance == 0 ? false:true      
    }

default:
return state;
}

}

export default bankReducer;