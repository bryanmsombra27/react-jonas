import { useDarkmodeContext } from "../context/DarkmodeContext";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
const DarkModeToggle = () => {

    const { isDarkMode, toggleDarkMode } = useDarkmodeContext()

    return (

        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>

    )

}

export default DarkModeToggle;