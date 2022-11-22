import fs from "fs";
const readFile = (): string => {
  try {
    return fs.readFileSync("itinerary.txt", "utf8");
  } catch (e: any) {
    return `Error ${e.stack}`;
  }
};

const toDate = (dStr: any): Date => {
  console.log(typeof dStr);
  const date = Number(dStr.substr(0, 2)) > 12 ? "24" : "25";
  const now = new Date(`December ${date}, 2022`);
  now.setHours(dStr.slice(0, dStr.indexOf(":")));
  now.setMinutes(dStr.slice(dStr.indexOf(":") + 1));
  now.setSeconds(0);
  return now;
};

const jingle = (time: Date) => {
  const file: string = readFile();
  const split: string[] = file.split("\r\n") || [];
  const difference = split.map((destination: string) => {
    const destinationTime: string = destination
      .split("(")
      .pop()
      ?.split(" GMT")[0]!;
    const timeToDate = toDate(destinationTime);
    const diff = Math.abs(
      new Date(timeToDate).getTime() - new Date(time).getTime()
    );
    return {
      destination: destination.slice(0, destination.indexOf(" (")),
      diff,
    };
  });
  const { destination, diff } = difference.reduce((prev, curr) =>
    prev.diff < curr.diff ? prev : curr
  );
  return `Arriving in ${destination} in ${diff / 60000} minutes`;
};

export default jingle;
