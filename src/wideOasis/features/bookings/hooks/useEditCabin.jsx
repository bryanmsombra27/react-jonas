import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabins } from "../../../services/apiCabins"
import toast from "react-hot-toast"

const useEditCabin = () => {
    const queryClient = useQueryClient()
    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ cabin, id }) => createEditCabins(cabin, id),
        onSuccess: () => {
            toast.success("cabin successfully edited")

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
        },
        onError: (err) => {
            // alert(err.message)
            toast.error(err.message)

        }
    })

    return {
        editCabin,
        isEditing
    }

}

export default useEditCabin;