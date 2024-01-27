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
    return Math.floor(Math.random() * maxSeconds * 100) / 100;
}

describe("Stop Watch Tests", () => {

    describe("Stop Watch Component Render Tests", () => {

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

        test("should render heading", () => {
            render(<App />);
            expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Shopify Stopwatch");
        });

        test("should render footer", () => {
            render(<App />);
            expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Made with ♡ by Joshua Dierickse");
        });

    });

    describe("Stop Watch Component Randomized Unit Tests", () => {
    
        for (let i = 0; i < 5; i++) {
            var temp = randomTime(100000);
            test("unit test: correct time for " + temp + " seconds", () => {
                render(<StopWatch time={temp} />);
                expect(screen.getByText(timeGenerator(temp))).toBeInTheDocument();
            });
        }

        for (let i = 0; i < 5; i++) {
            var timeListInput = [];
            for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
                timeListInput.push({lapNumber: j, absTime: randomTime(10000), lapTime: randomTime(10000)});
            }
            test("unit test: ListScroller with " + JSON.stringify(timeListInput) + " JSON props", () => {
                render(<ListScroller timeList={timeListInput} />);
                for (let j = 0; j < timeListInput.length; j++) {
                    expect(screen.getByText((j + 1) + ".")).toBeInTheDocument();
                    expect(screen.getByText(timeGenerator(timeListInput[j].absTime))).toBeInTheDocument();
                    expect(screen.getByText(timeGenerator(timeListInput[j].lapTime))).toBeInTheDocument();
                }
            });
        }

    });

    describe("Stop Watch Component Randomized Integration Tests", () => {

        for (let i = 0; i < 5; i++) {
            var actionList = [];
            var newButtonList = ["Start", "Stop", "Reset"];
            for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
                actionList.push({button: newButtonList[Math.floor(Math.random() * 3)], deltaTime: randomTime(1000)});
            }
            test("integration test: testing random combinations of start, stop, and reset with " + JSON.stringify(actionList) + " data", () => {
                render(<App />);
                const clockElement = screen.getByTestId("timer-text");
                var currentTime = 0;

                for (let j = 0; j < actionList.length; j++) {
                    fireEvent.click(screen.getByText(actionList[j].button));
                    act(() => jest.advanceTimersByTime(actionList[j].deltaTime * 1000));
                    if (actionList[j].button === "Start") {
                        currentTime += actionList[j].deltaTime;
                    }
                    if (actionList[j].button === "Reset") {
                        currentTime = 0;
                    }
                    expect(clockElement).toHaveTextContent(timeGenerator(currentTime));
                }
            });
        }

        for (let i = 0; i < 5; i++) {
            var lapIntervalsList = [];
            for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
                lapIntervalsList.push(randomTime(1000));
            }
            test("integration test: testing lap test random intervals from " + JSON.stringify(lapIntervalsList) + " lap list", () => {
                render(<App />);
                fireEvent.click(screen.getByText("Start"));
                var totalTime = 0;
                for (let j = 0; j < lapIntervalsList.length; j++) {
                    act(() => jest.advanceTimersByTime(lapIntervalsList[j] * 1000));
                    fireEvent.click(screen.getByText("Lap"));
                    totalTime += lapIntervalsList[j];
                    const absTimeElement = screen.getAllByText(timeGenerator(totalTime));
                    const lapTimeElement = screen.getAllByText(timeGenerator(lapIntervalsList[j]));
                    expect(screen.getByText((j + 1) + ".")).toBeInTheDocument();
                    expect(absTimeElement[0]).toBeInTheDocument();
                    expect(lapTimeElement[0]).toBeInTheDocument();
                }
            });
        }

    });

});