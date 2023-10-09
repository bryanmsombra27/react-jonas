import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings, getBooking } from "../../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../ui/Pagination";

const useBooking = () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const { id } = useParams()

    ///id



    // Queries  queryKey es similar a un arreglo de dependencias que refrecara la data dependiendo el cambio de las variables en el arreglo
    const { isLoading, data: booking, error } = useQuery({ queryKey: ['booking'], queryFn: () => getBooking(id), retry: false })



    return {
        isLoading,
        booking,
        error
    }

}

export default useBooking;