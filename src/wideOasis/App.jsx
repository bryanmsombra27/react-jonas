
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            //TIEMPO QUE LE TOMA A REACT-QUERY REFRESCAR LA DATA
            // staleTime: 60 * 1000,
            staleTime: 0,
        }
    }
})

const App = () => {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyles />

                <Router>
                    <Routes>
                        <Route element={<AppLayout />}  >
                            <Route path="dashboard" element={<Dashboard />} ></Route>
                            <Route index path="" element={<Dashboard />} exact ></Route>
                            <Route path="bookings" element={<Bookings />}  ></Route>
                            <Route path="cabins" element={<Cabins />}  ></Route>
                            <Route path="users" element={<NewUsers />}  ></Route>
                            <Route path="settings" element={<Settings />}  ></Route>
                            <Route path="account" element={<Account />}  ></Route>

                        </Route>
                        <Route path="login" element={<Login />}  ></Route>
                        <Route path="*" element={<PageNotFound />}  ></Route>
                    </Routes>
                </Router>


                <Toaster position="top-center" gutter={12} containerStyle={{ margin: "8px" }} toastOptions={{
                    success: { duration: 3000 },
                    error: { duration: 5000 },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-grey-0)",
                        color: "var(--color-grey-700)",
                    }
                }} />

            </QueryClientProvider>

        </>



    )

}

export default App;

