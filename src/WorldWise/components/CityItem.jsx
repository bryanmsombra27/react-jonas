import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCitiesContext } from '../context/CitiesContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

const CityItem = ({ city }) => {
    const { city: currentCity, deleteCity } = useCitiesContext()

    const handleDelete = (e, id) => {
        e.preventDefault();
        deleteCity(id)
    }

    return (

        <>
            <li >
                <Link to={`/app/cities/${city?.id}?lat=${city?.position?.lat}&lng=${city?.position?.lng}`} className={`${styles.cityItem}  ${city?.id == currentCity?.id && styles["cityItem--active"]}  `}>
                    {/* <Link to={`${city.id}`} className={styles.cityItem}> */}
                    <span className={styles.emoji}>{city?.emoji}</span>
                    <h3 className={styles.name}>{city?.cityName}</h3>
                    <time className={styles.date}>{formatDate(city?.date)}</time>
                    <button onClick={(e) => handleDelete(e, city?.id)} className={styles.deleteBtn}>&times;</button>
                </Link>

            </li>
        </>

    )

}

export default CityItem;