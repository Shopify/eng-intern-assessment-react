import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import App from "../src/App";

// describe("App Component", () => {
//   test("Render App component", () => {
//     render(<App />);
//   });

//   test("Start and Stop", () => {
//     const { getByText } = render(<App />);
//     fireEvent.click(getByText("Start"));
//     expect(getByText("Stop")).toBeTruthy();
//     fireEvent.click(getByText("Stop"));
//     expect(getByText("Start")).toBeTruthy();
//   });

//   test("Start and Reset", () => {
//     const { getByText } = render(<App />);
//     fireEvent.click(getByText("Start"));
//     expect(getByText("Stop")).toBeTruthy();
//     fireEvent.click(getByText("Reset"));
//     expect(getByText("Start")).toBeTruthy();
//     expect(getByText("00:00:00.00")).toBeTruthy();
//   });

//   test("Basic Lap Functionality", () => {
//     const { getByText } = render(<App />);
//     fireEvent.click(getByText("Start"));
//     expect(getByText("Stop")).toBeTruthy();
//     fireEvent.click(getByText("Lap"));
//     expect(getByText("00:00:00.00")).toBeTruthy(); // Adjust based on your expectations
//     fireEvent.click(getByText("Stop"));
//     expect(getByText("Start")).toBeTruthy();
//   });
// });