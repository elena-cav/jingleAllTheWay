const file =
  "Egvekinot (21:00 GMT)\r\nAuckland (22:00 GMT)\r\nJakarta (22:45 GMT)\r\nAstana (23:30 GMT)\r\nPretoria (00:45 GMT)\r\nParis (01:30 GMT)\r\nReykjavík (02:30 GMT)\r\nFermont (03:00 GMT)\r\nNew York City (03:45 GMT)\r\nLos Angeles (04:45 GMT)\r\nMexico City (05:30 GMT)\r\nBogotá (06:15 GMT)\r\nBelo Horizonte (06:45 GMT)\r\nUshuaia (07:30 GMT)";
const split: string[] = file.split("\r\n") || [];

const toDate = (dStr: any): Date => {
  const parsed = Date.parse(`2022-12-25T${dStr}:00`);
  const lastStopMilliSeconds = 1671953400000;
  const date = parsed > lastStopMilliSeconds ? "24" : "25";
  const now = new Date(`December ${date}, 2022`);
  now.setHours(dStr.slice(0, dStr.indexOf(":")));
  now.setMinutes(dStr.slice(dStr.indexOf(":") + 1));
  return now;
};
const getDestinationTime = (destination: string): string =>
  destination.split("(").pop()?.split(" GMT")[0]!;

const getDestination = (destination: string): string => {
  return destination.split(" (").shift()?.split(")")[0]!;
};
const getLocationTime = (location: string) => {
  const whichDestination = split.filter((itineraryDestination) => {
    const destination: string = getDestination(itineraryDestination);
    return location === destination;
  })[0];
  return `${getDestination(whichDestination)} at ${getDestinationTime(
    whichDestination
  )} GMT`;
};
type NextDestination = {
  destination: string;
  diff: number;
};
const nextDestination = {} as NextDestination;
const jingle = (time: Date) => {
  for (let i = 0; i < split.length; i++) {
    const dest = split[i];
    const destinationTime: string = getDestinationTime(dest);
    const timeToDate: Date = toDate(destinationTime);
    const getTime = (time: Date) => new Date(time).getTime();
    const diff: number = getTime(timeToDate) - getTime(time);
    const destination: string = dest.slice(0, dest.indexOf(" ("));
    if (diff > 0) {
      nextDestination.diff = diff;
      nextDestination.destination = destination;
      break;
    }
  }
  return `Arriving in ${nextDestination.destination} in ${
    nextDestination.diff / 60000
  } minutes`;
};

export { jingle, getLocationTime, toDate };
