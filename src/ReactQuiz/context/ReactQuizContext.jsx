import { createContext, useState, useContext, useReducer } from "react";
import questionsReducer from "../reducer/questionsReducer";

const ReactQuizContext = createContext();

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    timeRemining: null,
};


export const ReactQuizContextProvider = ({ children }) => {
    const [questionState, dispatch] = useReducer(questionsReducer, initialState);

    const { status, questions, index, answer, points, highscore, timeRemining } =
        questionState;

    return <ReactQuizContext.Provider value={{
        dispatch,
        status, questions, index, answer, points, highscore, timeRemining
    }}>
        {children}
    </ReactQuizContext.Provider>
}
export const useReactQuizContext = () => {
    const context = useContext(ReactQuizContext);

    if (context === undefined) { throw new Error("context was used outside of the provider") }

    return context
}