import LocationPin from "./LocationPin";
import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Polyline } from "@react-google-maps/api";
import locations from "../utils/locations.json";
import TimeInput from "./TimeInput";
import styles from "../styles/Map.module.css";
const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = () => {
  type Next = {
    lat: number;
    lng: number;
    location: string;
  };
  const [next, setNext] = useState<Next | null>(null);
  const [nextDestination, setNextDestination] = useState<string>("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkh_-9ikyxzcLs6n-4BmKm6LcIeEFtA1A",
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    if (map.current) {
      map.fitBounds(bounds);
    }

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const filterLocations = () => {
    const nextLocation = next?.location || "";
    const index = Object.keys(locations).indexOf(nextLocation);
    return Object.fromEntries(
      Object.entries(locations).filter((loc, i) => {
        if (i === index || i === index - 1) {
          return loc;
        }
      })
    );
  };

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    radius: 30000,
    zIndex: 1,
  };
  return isLoaded ? (
    <>
      <TimeInput
        setNext={setNext}
        nextDestination={nextDestination}
        setNextDestination={setNextDestination}
      />
      <button
        className={styles.reset}
        onClick={() => {
          setNextDestination("");
          setNext(null);
        }}
      >
        Reset
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {next ? (
          <div>
            <LocationPin
              key={next?.location}
              lat={next?.lat}
              lng={next?.lng}
              location={next?.location}
            />
          </div>
        ) : (
          Object.entries(locations).map(([location, { lat, lng }]) => (
            <LocationPin
              key={location}
              lat={lat}
              lng={lng}
              location={location}
            />
          ))
        )}
        <Polyline
          onLoad={onLoad}
          path={
            !next ? Object.values(locations) : Object.values(filterLocations())
          }
          options={options}
        />
      </GoogleMap>
    </>
  ) : (
    <>Loading ...</>
  );
};

export default Map;
