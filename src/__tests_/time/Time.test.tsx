import { render, screen, within } from "@testing-library/react";
import Time from "../../component/common/time/Time";
import React from "react";

const timeCase: TimeType = {
  milli: 0,
  second: 0,
  minute: 0,
  hour: 0,
};

test("render time component", async () => {
  //Arrange the component Time to render
  const { getByTitle } = render(<Time time={timeCase} className="stopwatch" />);

  //Act on div element with title time-holder
  const divElement = getByTitle("time-holder");

  //Assert checking length of time
  expect(within(divElement).getAllByRole("span").length).toBe(4);
});
