/**
* @jest-environment jsdom
*/

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";
import StopWatch from "../components/StopWatch";
import timeGenerator from "../components/timeGenerator";
import ListScroller from "../components/ListScroller";
jest.useFakeTimers();

function randomTime(maxSeconds) {
    return Math.floor(Math.random() * maxSeconds * 1000) / 1000;
}

describe("Timer Test", () => {
    test("should render Time text", () => {
        render(<App />);
        expect(screen.getByText("0.00")).toBeInTheDocument();
    });
    
    var buttonList = ["Start", "Stop", "Reset", "Lap"];
    for (let i = 0; i < buttonList.length; i++) {
        test("should render " + buttonList[i] + " button", () => {
            render(<App />);
            expect(screen.getByText(buttonList[i])).toBeInTheDocument(buttonList[i]);
        });
    }
    
    for (let i = 0; i < 5; i++) {
        var temp = randomTime(100000);
        test("should render the correct time for " + temp + " seconds", () => {
            render(<StopWatch time={temp} />);
            expect(screen.getByText(timeGenerator(temp))).toBeInTheDocument();
        });
    }

    for (let i = 0; i < 5; i++) {
        var timeListInput = [];
        for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
            timeListInput.push({lapNumber: j, absTime: randomTime(10000), lapTime: randomTime(10000)});
        }
        test("should render ListScroller with " + JSON.stringify(timeListInput) + " JSON", () => {
            render(<ListScroller timeList={timeListInput} />);
            for (let j = 0; j < timeListInput.length; j++) {
                expect(screen.getByText((j + 1) + ".")).toBeInTheDocument();
                expect(screen.getByText(timeGenerator(timeListInput[j].absTime))).toBeInTheDocument();
                expect(screen.getByText(timeGenerator(timeListInput[j].lapTime))).toBeInTheDocument();
            }
        });
    }

    test("should render heading", () => {
        render(<App />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Shopify Stopwatch");
    });

    test("should render footer", () => {
        render(<App />);
        expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Made with ♡ by Joshua Dierickse");
    });
});