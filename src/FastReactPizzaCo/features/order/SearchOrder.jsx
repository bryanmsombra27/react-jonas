import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleInputValue = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) {
            return
        }
        navigate(`/order/${search}`)
        setSearch("")
    }

    return (
        <form onSubmit={handleSubmit} >

            <input type="text" placeholder="Search order  #" value={search} onChange={handleInputValue} className="rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 " />
        </form>


    )

}

export default SearchOrder;