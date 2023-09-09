import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalPizzasItems } from "./CartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  // const totalPrice = useSelector(state => getTotalCartPrice(state))
  // const totalPizzas = useSelector(state => getTotalPizzasItems(state))
  const totalPizzas = useSelector(getTotalPizzasItems)
  const totalPrice = useSelector(getTotalCartPrice)

  if (!totalPizzas) return null

  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4  sm:px-6 text-sm  md:text-base  flex items-center justify-between ">
      <p className="text-stone-300 font-semibold space-x-4  sm:space-x-6 ">
        <span>{totalPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart" >Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
