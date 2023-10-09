import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../ui/Pagination";

const useBookings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient()

    //filter
    const filterValue = searchParams.get("status")
    // sort
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
    const [field, direction] = sortByRaw.split("-")
    const sortBy = {
        field,
        direction
    }

    ///pagination
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

    const filter = !filterValue || filterValue === "all" ? "" : { field: "status", value: filterValue }

    // Queries  queryKey es similar a un arreglo de dependencias que refrecara la data dependiendo el cambio de las variables en el arreglo
    const { isLoading, data, error } = useQuery({ queryKey: ['bookings', filter, sortBy, page], queryFn: () => getAllBookings({ filter, sortBy, page }) })

    //PREFETCH DATA  obteniendo la siguiente pagina  siguiente uina vez se carga la data 
    const pageCount = Math.ceil(data?.count / PAGE_SIZE)
    // const pageCount = Math.ceil(page / PAGE_SIZE)
    if (page < pageCount) {
        queryClient.prefetchQuery(
            {
                queryKey: ['bookings', filter, sortBy, page + 1], queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 })
            }
        )
    }
    //  PREFETCH DATA obtener la pagina anterior una vez se carga la data
    if (page > 1) {
        queryClient.prefetchQuery(
            {
                queryKey: ['bookings', filter, sortBy, page - 1], queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 })
            }
        )
    }




    return {
        isLoading,
        bookings: data?.data || [],
        count: data?.count || 0,
        error
    }

}

export default useBookings;