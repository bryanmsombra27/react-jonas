import { createContext, useState, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

export const actions = {
    citiesLoaded: "cities/loaded",
    citiesCreated: "cities/created",
    citiesDeleted: "cities/deleted",
    loading: "loading",
    rejected: "rejected",
    currentCity: "current"
}

const initialState = {
    cities: [],
    isLoading: false,
    city: {},
    error: ""
}
const CityReducer = (state = {}, action) => {

    switch (action.type) {
        case actions.loading:
            return {
                ...state,
                isLoading: true
            }

        case actions.citiesLoaded:
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case actions.citiesCreated:
            return {
                ...state,
                cities: [...state.cities, action.payload],
                isLoading: false,
            }
        case actions.citiesDeleted:
            return {
                ...state,
                cities: state.cities.filter(c => c.id !== action.payload),
                isLoading: false,
            }
        case actions.currentCity:
            return {
                ...state,
                isLoading: false,
                city: action.payload,
            }

        case actions.rejected:
            return {
                ...state, isLoading: false,
                rejected: action.payload
            }
        default:
            return state;
    }

}

export default CityReducer;



export const CitiesProvider = ({ children }) => {

    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [city, setCity] = useState({});
    const [cityState, dispatch] = useReducer(CityReducer, initialState);
    const { cities, isLoading, city } = cityState;

    useEffect(() => {
        const getCities = async () => {
            dispatch({ type: actions.loading })
            try {
                const res = await fetch("http://localhost:8000/cities")
                const data = await res.json()

                dispatch({ type: actions.citiesLoaded, payload: data })
                console.log(data)
            } catch (error) {
                dispatch({ type: actions.rejected, payload: "error fetching data" })
                alert("error fetching data")
            }

        }

        getCities()
    }, []);
    const getOneCity = async (id) => {
        dispatch({ type: actions.loading })
        try {
            const res = await fetch(`http://localhost:8000/cities/${id}`);
            const data = await res.json()
            dispatch({ type: actions.currentCity, payload: data })
            // console.log(data)
            // setCity(data)

        } catch (error) {
            dispatch({ type: actions.rejected, payload: "error fetching data" })

            alert("could not find the city")
        }

    }
    const createCity = async (city) => {
        try {
            dispatch({ type: actions.loading })
            const res = await fetch(`http://localhost:8000/cities`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(city)
            });
            const data = await res.json()
            dispatch({ type: actions.citiesCreated, payload: data })

        } catch (error) {
            alert("could not create the city")
        }
    }
    const deleteCity = async (id) => {
        try {
            dispatch({ type: actions.loading })
            const res = await fetch(`http://localhost:8000/cities/${id}`, {

                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)
            dispatch({ type: actions.citiesDeleted, payload: id })

        } catch (error) {
            alert("could not delete the city")
        }
    }


    return <CitiesContext.Provider value={{
        cities,
        isLoading,
        city,
        getOneCity,
        createCity,
        deleteCity
    }}>
        {children}
    </CitiesContext.Provider>
}
export const useCitiesContext = () => {
    const context = useContext(CitiesContext);

    if (context === undefined) {
        throw new Error("context was used outside of the provider")
    }

    return context
}