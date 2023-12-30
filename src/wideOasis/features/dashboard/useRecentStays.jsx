import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns"
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

const useRecentStays = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last")
    const queryDate = subDays(new Date(), numDays).toISOString()

    const { isLoading, data: stays, error } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}-days`]
    })

    const confirmStays = stays?.filter(stay => stay.status === "checked-in" || stay.status === "checked-out")


    return {
        isLoading,
        stays,
        confirmStays,
        numDays
    }


}

export default useRecentStays;