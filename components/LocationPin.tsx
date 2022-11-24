import styles from "../styles/LocationPin.module.css";
import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { getLocationTime } from "../utils/index";

const LocationPin = ({ lat, lng, location, locationAndTime }: any) => {
  const [clicked, setClicked] = useState(false);

  const onClick = (location: string) => {
    setClicked((clicked) => !clicked);
  };

  return (
    <div className={styles.wrapper}>
      <Marker
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
        }}
        onClick={() => onClick(location)}
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
