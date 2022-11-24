import { jingle, getLocationTime } from "..";

describe("Jingle All The Way", () => {
  test("it returns the next destination with the remaining minutes", () => {
    const newDate = new Date("Sun Dec 25 2022 02:20:00 GMT+0000");
    return expect(jingle(newDate)).toBe("Arriving in Reykjavík in 10 minutes");
  });

  test("it returns the next destination with the remaining minutes when given a time before midnight and after midday", () => {
    const newDate = new Date("Sun Dec 24 2022 18:20:00 GMT+0000");
    return expect(jingle(newDate)).toBe("Arriving in Egvekinot in 160 minutes");
  });

  test("it returns the next destination with the remaining minutes even if the previous destination is closer in time", () => {
    const newDate = new Date("Sun Dec 25 2022 03:52:00 GMT+0000");
    return expect(jingle(newDate)).toBe(
      "Arriving in Los Angeles in 53 minutes"
    );
  });
});
describe("Get time", () => {
  test("it returns the correct time of arrival when given a location", () => {
    return expect(getLocationTime("Belo Horizonte")).toBe(
      "Belo Horizonte at 06:45 GMT"
    );
  });
  test("it returns the correct time of arrival when given a location", () => {
    return expect(getLocationTime("New York City")).toBe(
      "New York City at 03:45 GMT"
    );
  });
});
