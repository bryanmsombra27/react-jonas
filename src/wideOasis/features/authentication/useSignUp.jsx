import { useMutation } from "@tanstack/react-query"
import { signup as signUpApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
export const useSignUp = () => {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (user) => {
            toast.success("acont successfully created, verify your new acount")
        }
    })

    return {
        signup, isLoading
    }

}