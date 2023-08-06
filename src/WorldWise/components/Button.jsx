import styles from './Button.module.css'

const Button = ({ children, handleClick, type, buttonType }) => {
    // const classType = type == "primary" ? styles.primary : styles.back

    return (

        <button className={`${styles.btn} ${styles[type]} `} onClick={handleClick} type={buttonType}   >{children}</button>

    )

}

export default Button;