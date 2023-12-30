import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns"
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

const useRecentBookings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last")
    const queryDate = subDays(new Date(), numDays).toISOString()

    const { isLoading, data: bookings, error } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${numDays}-days`]
    })

    return {
        isLoading,
        bookings
    }


}

export default useRecentBookings;