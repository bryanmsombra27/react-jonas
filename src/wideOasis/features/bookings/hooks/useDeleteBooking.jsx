import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteBooking } from "../../../services/apiBookings"

const useDeleteBooking = () => {
    // Access the client
    const queryClient = useQueryClient()

    const { mutate, isLoading: isDeliting } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success("deleting successfully")
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
        },
        onError: (err) => {
            // alert(err.message)
            toast.error(err.message)

        }

    })
    return {
        mutate,
        isDeliting
    }

}

export default useDeleteBooking;