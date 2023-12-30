import { createContext, useState, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkmodeContext = createContext();

export const DarkmodeContextProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode")
            document.documentElement.classList.remove("light-mode")
        } else {
            document.documentElement.classList.add("light-mode")
            document.documentElement.classList.remove("dark-mode")

        }

    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }


    return <DarkmodeContext.Provider value={{
        isDarkMode,
        toggleDarkMode,
    }}>
        {children}
    </DarkmodeContext.Provider>
}
export const useDarkmodeContext = () => {
    const context = useContext(DarkmodeContext);

    if (context === undefined) { throw new Error("context was used outside of the provider") }

    return context
}