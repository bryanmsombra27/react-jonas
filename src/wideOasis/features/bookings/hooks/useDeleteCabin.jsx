import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabins } from "../../../services/apiCabins"
import toast from "react-hot-toast"

const useDeleteCabin = () => {
    // Access the client
    const queryClient = useQueryClient()

    const { mutate, isLoading: isDeliting } = useMutation({
        mutationFn: deleteCabins,
        onSuccess: () => {
            toast.success("deleting successfully")
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
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

export default useDeleteCabin;