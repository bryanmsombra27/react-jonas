import { useFetcher } from "react-router-dom";
import Button from "../../UI/Button";
import { updateOrder } from "../../services/apiRestaurant";

const UpdateOrder = ({ order }) => {
    const fetcher = useFetcher()




    return (
        //no navega a otro lado, solo hace una revalidacion
        <fetcher.Form method="PATCH" className="text-right">
            <Button type="primary">Make Priority</Button>

        </fetcher.Form>

    )

}

export default UpdateOrder;


export const action = async ({ request, params }) => {

    await updateOrder(params.id, { priority: true })

    return null
}