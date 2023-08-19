import { useCitiesContext } from '../context/CitiesContext';
import CityItem from './CityItem';
import styles from './CityList.module.css'
import Message from './Message';
import Spinner from './Spinner';

const CityList = () => {
    const { cities, isLoading } = useCitiesContext()

    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message="add a city by clicking on a city on the map" />

    return (

        <ul className={styles.cityList}>
            {cities.map(city => <CityItem key={city.id} city={city} />)}
        </ul>

    )

}

export default CityList;

