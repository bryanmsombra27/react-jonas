import { useSearchParams } from "react-router-dom"

const useUrlPosition = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat") || 40
    const lng = searchParams.get("lng") || 0
    return {
        lat, lng,
    }



}

export default useUrlPosition;