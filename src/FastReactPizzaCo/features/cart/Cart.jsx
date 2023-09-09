import { Link } from 'react-router-dom';
import LinkButton from '../../UI/Link';
import Button from '../../UI/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './CartSlice';
import EmptyCart from './EmptyCart';



function Cart() {
  // const cart = fakeCart;
  const { username } = useSelector((state) => state.user)
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleClear = () => {
    dispatch(clearCart())
  }
  if (!cart.length) {
    return <EmptyCart />
  }

  return (
    <div className="px-4 py-3">

      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map(item => <CartItem key={item.pizzaId} item={item} />)}
      </ul>


      <div className='mt-6 space-x-2'>

        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" handleClick={handleClear}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
