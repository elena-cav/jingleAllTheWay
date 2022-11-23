import React from "react";
import { jingle } from "../utils/index";
export default function TimeInput() {
  const onChange = (input: any) => {
    console.log(input);
  };
  return (
    <div>
      <input onChange={onChange} type="time" required />
      <p></p>
    </div>
  );
}
