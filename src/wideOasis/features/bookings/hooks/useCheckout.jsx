import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

const useCheckout = () => {
    const queryClient = useQueryClient()
    const { mutate: checkout, isLoading: isCheckout } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: "checked-out",
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`)
            queryClient.invalidateQueries({ active: true })
        },
        onError: () => {
            toast.error("There was an error while checkout in")
        }
    })

    return {
        checkout,
        isCheckout
    }

}

export default useCheckout;