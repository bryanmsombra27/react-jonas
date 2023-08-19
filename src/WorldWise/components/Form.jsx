// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

//hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition";

//css
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
//components
import DatePicker from "react-datepicker";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCitiesContext } from "../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [emoji, setEmoji] = useState("")
  const navigate = useNavigate();
  const { lat, lng } = useUrlPosition()
  const { createCity, isLoading } = useCitiesContext()
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  useEffect(() => {
    if (!lng && !lat) return;

    const getCityByGeolocation = async () => {
      try {
        setIsLoadingGeocoding(true)
        setGeocodingError("")
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        // console.log(data)
        if (!data.countryCode) {
          throw new Error("it doesn't seem to be a city. Click somewhere else ")
        }
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))


      } catch (error) {
        setGeocodingError(error.message)
        // alert(error)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }

    getCityByGeolocation()
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />

  if (geocodingError) return <Message message={geocodingError} />
  if (!lat && !lng) return <Message message="Start by clicking somewhere on the map" />

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: {
        lat: +lat, lng: +lng
      }
    }

    await createCity(newCity)
    navigate("/app/cities")

  }

  return (
    <form className={`${styles.form} ${isLoading && styles.loading}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={(date) => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" id="date" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" buttonType="submit">
          Add
        </Button>

        <Button type="back" buttonType="button" handleClick={(e) => {
          navigate(-1)
        }}>
          &larr; Back

        </Button>
      </div>
    </form>
  );
}

export default Form;
