import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./UI/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, { action as orderAction } from "./features/order/CreateOrder";
import AppLayout from "./UI/AppLayout";
import Error from "./UI/Error";
import { Provider } from "react-redux";
import store from "./store";
import { action as priorityOrderAction } from "./features/order/UpdateOrder";

const router = createBrowserRouter([
    {
        //esta forma se usa para crear un layout compartido para toda la app no es necesario definir la ruta para este layout
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,

            }, {
                path: "/menu",
                element: <Menu />,
                //step 2 se importa el loader asignado 
                loader: menuLoader,
                errorElement: <Error />,
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/order/new",
                element: <CreateOrder />,
                action: orderAction
            },
            {
                path: "/order/:id",
                element: <Order />,
                loader: orderLoader,
                errorElement: <Error />,
                action: priorityOrderAction
            }
        ]
    },
    {
        path: "/login",
        element: <>
            <h1>login</h1>
        </>
    }


])

const App = () => {

    return <Provider store={store}>
        <RouterProvider router={router} ></RouterProvider>
    </Provider>

}

export default App;

