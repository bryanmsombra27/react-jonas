import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from './AppLayout.module.css'
const Layout = () => {

    return (
        <div className={styles.app}>
            <User />
            <Sidebar />
            <Map />
        </div>

    )

}

export default Layout;