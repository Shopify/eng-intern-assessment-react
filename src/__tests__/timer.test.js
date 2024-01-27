/**
* @jest-environment jsdom
*/

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";
import StopWatch from "../components/StopWatch";
import timeGenerator from "../components/timeGenerator";

describe("Timer Test", () => {
    test("should render Time text", () => {
        render(<App />);
        const timeElement = screen.getByText("0.00");
        expect(timeElement).toBeInTheDocument();
    })
    
    var buttonList = ["Start", "Stop", "Reset", "Lap"];
    for (let i = 0; i < buttonList.length; i++) {
        test("should render " + buttonList[i] + " button", () => {
            render(<App />);
            const buttonElement = screen.getByText(buttonList[i]);
            expect(buttonElement).toBeInTheDocument(buttonList[i]);
        })
    }
    
    var temp;
    for (let i = 0; i < 5; i++) {
        temp = Math.floor(Math.random() * 100000000) / 1000
        test("should render the correct time for " + temp + " seconds", () => {
            render(<StopWatch time={temp} />);
            const stopWatchElement = screen.getByText(timeGenerator(temp));
            expect(stopWatchElement).toBeInTheDocument();
        })
    }

    test("should render heading", () => {
        render(<App />);
        const headerElement = screen.getByRole("heading", { level: 1 });
        expect(headerElement).toHaveTextContent("Shopify Stopwatch");
    })

    test("should render footer", () => {
        render(<App />);
        const footerElement = screen.getByRole("heading", { level: 4 });
        expect(footerElement).toHaveTextContent("Made with ♡ by Joshua Dierickse");
    })
})