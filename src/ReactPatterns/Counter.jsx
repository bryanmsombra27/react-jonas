
import { createContext, useContext, useState } from "react";
//COMPOUND COMPONENT PATTERN

//1) crear contexto
export const CounterContext = createContext();



//2) CREAR EL COMPONENTE PADRE
const Counter = ({ children }) => {
    const [count, setCount] = useState(0);
    const increase = () => setCount(prevState => prevState + 1)
    const decrease = () => setCount(prevState => prevState - 1)

    return (

        <CounterContext.Provider value={{ count, increase, decrease }}>
            <span>{children}</span>
        </CounterContext.Provider>

    )
}

// 3) crear los componentes que ayudaran  a implementar este patron 
const Count = () => {
    const { count } = useContext(CounterContext);
    return (

        <span>{count}</span>

    )

}
const Label = ({ children }) => {
    return (

        <span>{children}</span>

    )

}
const Increase = ({ icon }) => {
    const { increase } = useContext(CounterContext);
    return (

        <button onClick={increase}>{icon}</button>

    )

}
const Decrease = ({ icon }) => {
    const { decrease } = useContext(CounterContext);
    return (

        <button onClick={decrease}>{icon}</button>

    )

}

//4) agregar los componentes hijos como propiedades del componente padre
Counter.Count = Count;
Counter.Increase = Increase;
Counter.Decrease = Decrease;
Counter.Label = Label;



export default Counter;