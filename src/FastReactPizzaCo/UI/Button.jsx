import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type, handleClick }) => {
    const base = "bg-yellow-400 text-sm  rounded-full uppercase font-semibold text-stone-800 inline-block tracking-wide  hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2  focus:bg-yellow-300 disabled:cursor-not-allowed"
    const styles = {
        primary: base + " py-3 px-4  md:px-6 md:py-4",
        small: base + " py-2 px-4   md:px-5 md:py-2.5 text-xs",
        round: base + " py-1 px-2.5   md:px-3.5 md:py-2 text-sm",
        secondary: "border-2 border-stone-300 text-sm  rounded-full uppercase font-semibold text-stone-400 inline-block tracking-wide  hover:bg-stone-300 hover:text-stone-800 transition-colors focus:bg-stone-300 duration-300 focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2  disabled:cursor-not-allowed py-2.5 px-4  md:px-6 md:py-3.5"
    }


    if (to) return <Link to={to} className={styles[type]} >{children}</Link>

    if (handleClick) return <button
        onClick={handleClick}
        disabled={disabled}
        className={styles[type]}>
        {children}
    </button>

    return (

        <button
            disabled={disabled}
            className={styles[type]}>
            {children}
        </button>

    )

}

export default Button;