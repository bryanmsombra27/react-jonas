
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useFakeAuthContext } from "../context/FakeAuthContext";
import { useEffect } from "react";

// const ProtectedRoutes = () => {
//     const { isAuthenticated } = useFakeAuthContext()

//     return isAuthenticated ? <Outlet /> : <Navigate to="/login" />

// }


const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useFakeAuthContext()

    return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoutes;
