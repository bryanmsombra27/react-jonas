import { useCitiesContext } from '../context/CitiesContext'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'

const CountryList = () => {
    const { cities, isLoading } = useCitiesContext()

    const countries = cities && cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr
    }

        , []);

    if (isLoading) return <Spinner />
    if (!countries.length) return <Message message="add a city by clicking on a city on the map" />

    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem country={country} />)}
        </ul>
    )

}

export default CountryList;