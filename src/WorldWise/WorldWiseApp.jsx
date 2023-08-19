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
import { CitiesProvider } from "./context/CitiesContext";
import { FakeAuthContextProvider } from "./context/FakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
// import { PrivateRoute } from "./pages/ProtectedRoutes";

const WorldWiseApp = () => {


    return (
        <FakeAuthContextProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="product" element={<Product />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route index element={<Homepage />} />
                        <Route path="app" element={<>
                            <ProtectedRoutes>
                                <Layout />

                            </ProtectedRoutes>
                        </>}>
                            <Route index element={<Navigate replace to="cities" />} />
                            <Route path="cities" element={<CityList />} />
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />} />
                            <Route path="cities/:id" element={<City />} />

                        </Route>
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </FakeAuthContextProvider>



    )

}

export default WorldWiseApp;