import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || ""
    const handleChange = (e) => {
        const value = e.target.value
        searchParams.set("sortBy", value)
        setSearchParams(searchParams)
    }

    return (

        <Select options={options} type="white" onChange={handleChange} value={sortBy} />

    )

}

export default SortBy;