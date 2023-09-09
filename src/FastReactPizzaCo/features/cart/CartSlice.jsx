import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    // cart: [{
    //     pizzaId: 12,
    //     name: "Mediterranean",
    //     quantity: 2,
    //     unitPrice: 16,
    //     totalPrice: 32
    // }],
};
export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cart.push(action.payload);
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuantity: (state, action) => {
            const findItem = state.cart.find(item => item.pizzaId == action.payload)
            findItem.quantity++
            findItem.totalPrice = findItem.unitPrice * findItem.quantity
        },
        decreaseItemQuantity: (state, action) => {
            const findItem = state.cart.find(item => item.pizzaId == action.payload)
            findItem.quantity--
            findItem.totalPrice = findItem.unitPrice * findItem.quantity

            if (findItem.quantity == 0) {
                //asi se puede llamar un metodo definido en el reducer
                CartSlice.caseReducers.deleteItem(state, action)
            }

        },
        clearCart: (state, action) => {
            state.cart = [];
        },
    },
});


//selectors reselector library para optimizar esta parte 
export const getTotalPizzasItems = (state) => {
    const { cart } = state?.cart
    return cart.reduce((acc, item) => acc + item.quantity, 0)
}
export const getTotalCartPrice = (state) => {
    const { cart } = state?.cart
    return cart.reduce((acc, item) => {
        const price = item.quantity * item.unitPrice
        return acc + price
    }, 0)
}
// export const getQuantityById = (state, id) => {
//     const { cart } = state?.cart
//     const findItem = cart.filter(item => item.pizzaId == id)

//     return findItem.quantity
// }
export const getQuantityById = (id) => (state) => {
    const { cart } = state?.cart
    const findItem = cart.find(item => item.pizzaId == id)

    return findItem?.quantity || 0
}


//ACTION CREATORS
export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart
} = CartSlice.actions;


export default CartSlice.reducer