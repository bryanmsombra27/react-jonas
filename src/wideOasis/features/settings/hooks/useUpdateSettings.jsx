import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateSetting } from "../../../services/apiSettings"

const useUpdateSettings = () => {
    const queryClient = useQueryClient()
    const { mutate: editSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("settings successfully edited")

            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['settings'] })
        },
        onError: (err) => {
            // alert(err.message)
            toast.error(err.message)

        }
    })

    return {
        editSetting,
        isUpdating
    }

}

export default useUpdateSettings;