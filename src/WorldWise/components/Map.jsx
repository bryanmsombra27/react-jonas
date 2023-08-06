
import { useNavigate, useSearchParams, } from 'react-router-dom';
import styles from './Map.module.css'
const Map = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    const redirect = () => {
        navigate("form")
    }
    return (

        <div className={styles.mapContainer} onClick={redirect}>
            <h1>koso</h1>
            <button
                onClick={() => setSearchParams({ lat: 21, lng: 50 })}
            >change Pos</button>

        </div>
    )

}

export default Map;