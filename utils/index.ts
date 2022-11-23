const file =
  "Egvekinot (21:00 GMT)\r\nAuckland (22:00 GMT)\r\nJakarta (22:45 GMT)\r\nAstana (23:30 GMT)\r\nPretoria (00:45 GMT)\r\nParis (01:30 GMT)\r\nReykjavík (02:30 GMT)\r\n Fermont (03:00 GMT)\r\n New York City (03:45 GMT)\r\nLos Angeles (04:45 GMT)\r\nMexico City (05:30 GMT)\r\nBogotá (06:15 GMT)\r\nBelo Horizonte (06:45 GMT)\r\nUshuaia (07:30 GMT)";
const split: string[] = file.split("\r\n") || [];

const toDate = (dStr: any): Date => {
  const date = Number(dStr.substr(0, 2)) > 12 ? "24" : "25";
  const now = new Date(`December ${date}, 2022`);
  now.setHours(dStr.slice(0, dStr.indexOf(":")));
  now.setMinutes(dStr.slice(dStr.indexOf(":") + 1));
  return now;
};
const getDestinationTime = (destination: string): string =>
  destination.split("(").pop()?.split(" GMT")[0]!;

const getDestination = (destination: string): string =>
  destination.split(" (").shift()?.split(")")[0]!;

const getLocationTime = (location: string) => {
  console.log("LOCATION", location);
  const whichDestination = split.filter((itineraryDestination) => {
    console.log("ITINERARY", itineraryDestination);
    const destination: string = getDestination(itineraryDestination);
    return location === destination;
  })[0];
  return `${getDestination(whichDestination)} at ${getDestinationTime(
    whichDestination
  )} GMT`;
};
const jingle = (time: Date) => {
  const difference = split.map((destination: string) => {
    const destinationTime: string = getDestinationTime(destination);
    const timeToDate: Date = toDate(destinationTime);
    const getTime = (time: Date) => new Date(time).getTime();
    const diff = Math.abs(getTime(timeToDate) - getTime(time));
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

export { jingle, getLocationTime };
