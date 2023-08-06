import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

const CityItem = ({ city }) => {

    return (

        <>
            <li >
                <Link to={`/app/cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`} className={styles.cityItem}>
                    {/* <Link to={`${city.id}`} className={styles.cityItem}> */}
                    <span className={styles.emoji}>{city.emoji}</span>
                    <h3 className={styles.name}>{city.cityName}</h3>
                    <time className={styles.date}>{formatDate(city.date)}</time>
                    <button className={styles.deleteBtn}>&times;</button>
                </Link>

            </li>
        </>

    )

}

export default CityItem;