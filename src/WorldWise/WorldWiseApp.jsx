import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css"
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./pages/Layout";
import Product from "./pages/Product";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import City from "./components/City";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

const WorldWiseApp = () => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getCities = async () => {
            try {
                setIsLoading(true)
                const res = await fetch("http://localhost:8000/cities")
                const data = await res.json()

                setCities(data)
                console.log(data)
            } catch (error) {
                alert("error fetching data")
            } finally {
                setIsLoading(false)

            }

        }

        getCities()

    }, []);



    return (

        <BrowserRouter>
            <Routes>
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route index element={<Homepage />} />
                <Route path="app" element={<Layout />}>
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
                    <Route path="form" element={<Form />} />
                    <Route path="cities/:id" element={<City />} />

                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>

    )

}

export default WorldWiseApp;