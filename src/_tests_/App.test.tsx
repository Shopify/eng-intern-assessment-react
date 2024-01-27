// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import App from "../App";

// test("renders stopwatch app", () => {
//   render(<App />);
//   const mainContainer = screen.getByTestId("main-stopwatch");
//   expect(mainContainer).toBeInTheDocument();
// });

// test("start and stop the stopwatch", () => {
//   render(<App />);
//   const startButton = screen.getByTestId("start-button");
//   const stopButton = screen.getByTestId("stop-button");

//   fireEvent.click(startButton);
//   expect(screen.getByTestId("digits")).toHaveTextContent("00 : 00 : 00");

//   fireEvent.click(stopButton);
//   expect(screen.getByTestId("digits")).toHaveTextContent("00 : 00 : 00");
// });
