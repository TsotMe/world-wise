import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce((acc, city) => {
    if (!acc.find((country) => country.id === city.country.id)) {
      acc.push({ id: city.id, country: city.country, emoji: city.emoji });
    }

    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
