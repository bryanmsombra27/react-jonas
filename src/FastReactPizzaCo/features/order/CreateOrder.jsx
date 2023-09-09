import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/CartSlice";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const cart = fakeCart;
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation()
  const { username, status: addressStatus, position, address, error } = useSelector((state) => state.user)
  const { cart } = useSelector((state) => state.cart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * .2 : 0
  const totalPrice = totalCartPrice + priorityPrice
  const isSubmitting = navigation.state === "submitting"
  //obtener la data que pueda regresar la funcion Action del react-router-dom
  const formErrors = useActionData()
  const isLoadingAddress = addressStatus === "loading"
  const dispatch = useDispatch()

  if (!cart) return <EmptyCart />

  const getPosition = (e) => {
    e.preventDefault()
    dispatch(fetchAddress())
  }

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" >
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input type="text" name="customer" required className="input w-full" defaultValue={username} />

          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex-grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="flex-grow">
            <input type="text" name="address" required className="input w-full" disabled={isLoadingAddress} defaultValue={address} />
            {addressStatus === "error" && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{error}</p>}
          </div>



          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px] ">
              <Button disabled={isLoadingAddress} type="small" handleClick={getPosition} >Get position</Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5 ">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-6 h-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div >
          {/* una forma para enviar data que se ocupe dentro del action es enviarla atraves de un input oculto  y convertir la informacion a un string */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude},${position.longitude}` : ""} />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting ? "Placing order..." : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export const action = async ({ request }) => {
  const formData = await request.formData() //OBTENER LA DATA DEL FORMULARIO
  const data = Object.fromEntries(formData) //convirtiendo la data del formulario a un objeto

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  }
  const errors = {}

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please enter your phone number correctly, we probably contact you."
  }

  if (Object.keys(errors).length > 0) {
    return errors
  }



  const newOrder = await createOrder(order)


  //se usa esta tecnica cuando se debe de actualizar algo del store en una tarea asyncrona pero no sobre utilizar  porque podria causar problemas de performance  normalmente usar para limpiar el state a su estado inicial dependiendo el caso 
  store.dispatch(clearCart())

  //La redireccion esta hecha con react-router-dom, ya que dentro de las funciones de action y loaders no se pueden llamar los hooks
  return redirect(`/order/${newOrder.id}`)

}

export default CreateOrder;
