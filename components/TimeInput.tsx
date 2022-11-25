import React, { useState } from "react";
import { jingle, toDate } from "../utils/index";
import locationsCoords from "../utils/locations.json";
import styles from "../styles/TimeInput.module.css";
interface Coords {
  lat: number;
  lng: number;
}
interface Locations {
  [key: string]: Coords;
}
const locations: Locations = locationsCoords;

interface TimeInputProps {
  nextDestination: string;
  setNextDestination: React.Dispatch<React.SetStateAction<string>>;
  setNext: React.Dispatch<React.SetStateAction<any>>;
}
export default function TimeInput({
  setNext,
  nextDestination,
  setNextDestination,
}: TimeInputProps) {
  const onChange = ({ target }: any) => {
    const time = target.value;
    const date = toDate(time);
    const result = jingle(date);
    setNextDestination(result);
    const location = result.substring(
      result.indexOf("in ") + 3,
      result.lastIndexOf(" in")
    );
    if (locations && location) {
      const coords: Coords = locations[location];
      setNext({ lat: coords.lat, lng: coords.lng, location });
    }
  };
  return (
    <div className={styles.wrapper}>
      <p>Find out where Santa is going to be at any given time</p>

      <input className={styles.time} onChange={onChange} type="time" required />
      <p className={nextDestination !== "" ? styles.visible : styles.hidden}>
        {nextDestination}
      </p>
    </div>
  );
}
