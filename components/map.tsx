import LocationPin from "./LocationPin";
import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import locations from "../utils/locations.json";

const containerStyle = {
  width: "600px",
  height: "600px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBwG-dKWULAdLfRHt9xgGV0RZrRUDD5Syk",
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {Object.entries(locations).map(([location, { lat, lng }]) => (
        <LocationPin key={location} lat={lat} lng={lng} location={location} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
