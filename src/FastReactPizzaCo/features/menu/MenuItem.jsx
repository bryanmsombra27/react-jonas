import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem, getQuantityById } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  const quantity = useSelector(getQuantityById(id))
  // const currQuantity = 
  const handleClick = () => {
    const newPizza = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: 1 * unitPrice
    }
    dispatch(addItem(newPizza))
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24  ${soldOut ? "grayscale opacity-70" : ""}   `} />
      <div className="flex flex-col flex-grow pt-0.5">
        <p className="font-medium ">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {quantity > 0 && <>
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity pizzaId={id} currentQuantity={quantity} />
              <DeleteItem pizzaId={id} />

            </div>

          </>}

          {!soldOut && !(quantity > 0) && <Button type="small"
            handleClick={handleClick}
          >
            Add to cart
          </Button>
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
