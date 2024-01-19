import { formatTime } from "../utils/formatTime";

describe("Time Formatting", () => {
   it("correctly formats hours", () => {
      const time = 3600000; // 1 hour in milliseconds
      expect(formatTime(time)).toMatch(/^01:00:00:00$/);
   });

   it("correctly formats minutes", () => {
      const time = 60000; // 1 minute in milliseconds
      expect(formatTime(time)).toMatch(/^00:01:00:00$/);
   });

   it("correctly formats seconds", () => {
      const time = 1000; // 1 second in milliseconds
      expect(formatTime(time)).toMatch(/^00:00:01:00$/);
   });

   it("correctly formats milliseconds", () => {
      const time = 1; // 1 millisecond
      expect(formatTime(time)).toMatch(/^00:00:00:00$/);
   });
});
