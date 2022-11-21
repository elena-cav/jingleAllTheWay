import fs from "fs";
import moment from "moment";
const readFile = (): string => {
  try {
    const data = fs.readFileSync("itinerary.txt", "utf8");
    return data;
  } catch (e: any) {
    console.log("Error:", e.stack);
    return "Error";
  }
};

function toDate(dStr: any, format: any): Date {
  const now = new Date();
  now.setHours(dStr.substr(0, dStr.indexOf(":")));
  now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
  now.setSeconds(0);
  return now;
}

const jingle = (time: Date) => {
  console.log("TIME", time);
  const file: string = readFile();
  const split: string[] = file.split("\r\n") || [];
  split.forEach((destination: string) => {
    const destinationTime: string = destination
      .split("(")
      .pop()
      ?.split(" GMT")[0]!;
    const timeToDate = toDate(destinationTime, "h:m");
    var duration = moment.duration(moment(time).diff(timeToDate, "days"));
    console.log("HOURS", duration);
  });
  return "Arriving in Reykjavík in 10 minutes";
};

export default jingle;
