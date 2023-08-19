import { createContext, useState, useContext, useReducer } from "react";

const FakeAuthContext = createContext();
const initalState = {
    user: null,
    isAuthenticated: false,
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

export const types = {

    login: "LOGIN",
    logout: "LOGOUT"
}

const authReducer = (state = {}, action) => {

    switch (action.type) {

        case types.login:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case types.logout:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }

        default:
            return state;
    }

}

export default authReducer;


export const FakeAuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initalState);
    const { user,
        isAuthenticated } = authState
    const login = (email, password) => {

        if (FAKE_USER.email === email && FAKE_USER.password === password) {
            dispatch({
                type: types.login,
                payload: FAKE_USER
            })
        }

    }

    const logOut = () => {
        dispatch({
            type: types.logout
        })

    }


    return <FakeAuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logOut
    }}>
        {children}
    </FakeAuthContext.Provider>
}
export const useFakeAuthContext = () => {
    const context = useContext(FakeAuthContext);

    if (context === undefined) { throw new Error("context was used outside of the provider") }

    return context
}