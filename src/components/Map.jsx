import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={6} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>
                {city.emoji}
                <span>{city.cityName}</span>
              </span>
            </Popup>
          </Marker>
        ))}

        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
