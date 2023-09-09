import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./CartSlice";

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
    const dispatch = useDispatch()

    const handleIncrease = () => {
        dispatch(increaseItemQuantity(pizzaId))
    }

    const handleDecrease = () => {
        dispatch(decreaseItemQuantity(pizzaId))
    }
    return (

        <div className="flex items-center gap-3">
            <Button type="round" handleClick={handleDecrease} >-</Button>
            <p>{currentQuantity}</p>
            <Button type="round" handleClick={handleIncrease} >+</Button>
        </div>

    )

}

export default UpdateItemQuantity;