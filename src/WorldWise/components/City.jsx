import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useCitiesContext } from "../context/CitiesContext";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams()
  const { getOneCity, city, isLoading } = useCitiesContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const navigate = useNavigate();


  useEffect(() => {
    getOneCity(id)
  }, [id]);

  if (isLoading) return <Spinner />

  return city && (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{city?.emoji}</span> {city?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {city?.cityName} on</h6>
        <p>{formatDate(city?.date || null)}</p>
      </div>

      {city?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{city?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${city?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {city?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type="back" buttonType="button" handleClick={(e) => {
          navigate(-1)
        }}>
          &larr; Back

        </Button>
      </div>
    </div>
  );
}

export default City;
