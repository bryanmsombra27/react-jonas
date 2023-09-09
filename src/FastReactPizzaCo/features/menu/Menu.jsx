import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // step 3  obtiene la data del loader
  const menu = useLoaderData()

  return <ul className="divide-y divide-stone-200 px-2">
    {menu.map(item => <MenuItem key={item.id} pizza={item} />)}
  </ul>
}

//step 1  el loader debe retornar la data que se ocupara en la pagina
export const loader = async () => {
  const menu = await getMenu()

  return menu
}

export default Menu;
