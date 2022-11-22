import jingle from "..";
describe("Name of the group", () => {
  function makeDate(date: Date) {
    return new Date(date.getTime()); //<--error here
  }

  test("name", () => {
    const newDate = new Date("Sun Dec 25 2022 02:20:00 GMT+0000"); //
    return expect(jingle(newDate)).toBe("Arriving in Reykjavík in 10 minutes");
  });
});
