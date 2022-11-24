import { jingle, getLocationTime } from "..";

describe("Jingle", () => {
  test("name", () => {
    const newDate = new Date("Sun Dec 25 2022 02:20:00 GMT+0000"); //
    return expect(jingle(newDate)).toBe("Arriving in Reykjavík in 10 minutes");
  });
  test("namse", () => {
    const newDate = new Date("Sun Dec 25 2022 02:20:00 GMT+0000"); //
    return expect(jingle(newDate)).toBe("Arriving in Reykjavík in 10 minutes");
  });
  test.only("namse", () => {
    const newDate = new Date("Sun Dec 25 2022 03:52:00 GMT+0000"); //
    return expect(jingle(newDate)).toBe(
      "Arriving in Los Angeles in 53 minutes"
    );
  });
});
describe("Jingle", () => {
  test("name", () => {
    return expect(getLocationTime("Belo Horizonte")).toBe(
      "Belo Horizonte at 06:45 GMT"
    );
  });
});
