import CreateCustomer from "./features/Customers/CreateCustomer";
import Customer from "./features/Customers/Customer";
import AccountOperations from "./features/Accounts/AccountOperations";
import BalanceDisplay from "./features/Accounts/BalanceDisplay";
import "./index.css"
import { useSelector } from "react-redux";

const AccountApp = () => {
    const { fullName } = useSelector((state) => state.customer)

    return (
        <div>
            <h1>🏦 The React-Redux Bank ⚛️</h1>
            {fullName === "" ? (
                <CreateCustomer />

            ) : (
                <>
                    <Customer />
                    <AccountOperations />
                    <BalanceDisplay />
                </>
            )}

        </div>

    )

}

export default AccountApp;