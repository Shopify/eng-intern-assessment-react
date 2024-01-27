// import React, { Component } from "react";
// import { render, screen } from "@testing-library/react";
// import StopWatch from "../components/StopWatch";

// test("renders stopwatch with initial time", () => {
//   render(<StopWatch timerSeconds={0} />);
//   const digits = screen.getByTestId("digits");
//   expect(digits).toHaveTextContent("00 : 00 : 00");
// });

// test("renders stopwatch with non-zero time", () => {
//   render(<StopWatch timerSeconds={3665} />);
//   const digits = screen.getByTestId("digits");
//   expect(digits).toHaveTextContent("01 : 01 : 05");
// });

/*
The below is to add test to StopWatch.tsx Component
<div>
  <h1 className="digits" data-testid="digits">{`${hrs} : ${mins} : ${secs}`}</h1>
</div>
*/
