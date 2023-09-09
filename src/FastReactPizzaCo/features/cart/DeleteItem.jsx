import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { deleteItem } from "./CartSlice";

const DeleteItem = ({ pizzaId }) => {
    const dispatch = useDispatch()

    const removeItem = () => {
        dispatch(deleteItem(pizzaId))
    }
    return (

        <Button type="small" handleClick={removeItem} >Delete</Button>


    )

}

export default DeleteItem;