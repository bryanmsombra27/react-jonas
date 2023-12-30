import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateCurrentUser } from "../../services/apiAuth"

const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success("user account success update")

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (err) => {
            // alert(err.message)
            toast.error(err.message)

        }
    })

    return {
        updateUser,
        isUpdating
    }

}

export default useUpdateUser;