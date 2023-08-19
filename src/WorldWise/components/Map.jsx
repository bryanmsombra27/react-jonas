
import { useNavigate, useSearchParams, } from 'react-router-dom';
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCitiesContext } from '../context/CitiesContext';
import Button from './Button';
import { useGeolocation } from "../hooks/useGeoLocation";
import useUrlPosition from '../hooks/useUrlPosition';
const Map = () => {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { position: geoLocationPosition, getPosition, isLoading: isLoadingPosition } = useGeolocation(mapPosition)
    const { cities } = useCitiesContext()
    const { lat, lng } = useUrlPosition()



    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng])

    }, [lat, lng]);

    useEffect(() => {
        if (geoLocationPosition.lat && geoLocationPosition.lng) setMapPosition([geoLocationPosition?.lat, geoLocationPosition?.lng])
    }, [geoLocationPosition]);

    return (

        <div className={styles.mapContainer} >
            {!geoLocationPosition.lat && !geoLocationPosition.lng && (
                <Button type="position" buttonType="button" handleClick={getPosition} >
                    {isLoadingPosition ? "loading..." : "Use your position"}
                </Button>
            )}

            <MapContainer className={styles.map} center={mapPosition} zoom={5} scrollWheelZoom={true}

            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.length > 0 && cities.map(city =>
                    <Marker position={[city?.position?.lat || 0, city?.position?.lng || 0]} key={city?.id}>
                        <Popup>
                            <span>{city?.emoji}</span>
                            <span>{city?.cityName}</span>
                        </Popup>
                    </Marker>
                )
                }
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>

        </div>
    )

}
const ChangeCenter = ({ position }) => {
    const map = useMap()
    map.setView(position)

    return null
}

const DetectClick = () => {
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => navigate(`form?lat=${e?.latlng?.lat}&lng=${e?.latlng?.lng}`)
    })
}

export default Map;