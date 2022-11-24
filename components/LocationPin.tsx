import styles from "../styles/LocationPin.module.css";
import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { getLocationTime } from "../utils/index";

interface LocationProps {
  lat: number;
  lng: number;
  location: string;
}

const LocationPin = ({ lat, lng, location }: LocationProps) => {
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked((clicked) => !clicked);
  };

  return (
    <div className={styles.wrapper}>
      <Marker
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
        }}
        onClick={() => onClick()}
        position={{ lat, lng }}
      />
      {clicked && (
        <InfoWindow
          onCloseClick={() => {
            setClicked(false);
          }}
          position={{ lat, lng }}
        >
          <p className={styles["info-text"]}>{getLocationTime(location)}</p>
        </InfoWindow>
      )}
    </div>
  );
};
export default LocationPin;
