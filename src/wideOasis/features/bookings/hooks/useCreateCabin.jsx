import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabins } from "../../../services/apiCabins"
import toast from "react-hot-toast"

const useCreateCabin = () => {
    const queryClient = useQueryClient()
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: createEditCabins,
        onSuccess: () => {
            toast.success("cabin successfully created")

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
        },
        onError: (err) => {
            // alert(err.message)
            toast.error(err.message)

        }
    })

    return {
        createCabin,
        isCreating
    }


}

export default useCreateCabin;