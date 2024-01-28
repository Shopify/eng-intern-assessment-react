/**
 * @jest-environment jsdom
 */

/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";
import StopWatch from "../components/StopWatch";
import timeGenerator from "../components/timeGenerator";
import ListScroller from "../components/ListScroller";

// Fake timer for testing
jest.useFakeTimers();

// Generates a random time from 0.00s to maxSeconds
function randomTime(maxSeconds) {
    return Math.floor(Math.random() * maxSeconds * 100) / 100;
}

describe("Stop Watch Tests", () => {

    describe("Stop Watch Component Render Tests", () => {

        // Time text render test
        test("should render time text", () => {
            render(<App />);
            expect(screen.getByText("0.00")).toBeInTheDocument();
        });
        
        // Iterates through the list of buttons and tests if each one gets rendered
        var buttonList = ["Start", "Stop", "Reset", "Lap"];
        for (let i = 0; i < buttonList.length; i++) {
            test("should render " + buttonList[i] + " button", () => {
                render(<App />);
                expect(screen.getByText(buttonList[i])).toBeInTheDocument(buttonList[i]);
            });
        }

        // Heading render test
        test("should render heading", () => {
            render(<App />);
            expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Shopify Stopwatch");
        });

        // Footer render test
        test("should render footer", () => {
            render(<App />);
            expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Made with ♡ by Joshua Dierickse");
        });
    });

    describe("Stop Watch Component Randomized Unit Tests", () => {
    
        // Unit test, checks if the stop watch renders the correct time when given props with random times (tested 5 times)
        for (let i = 0; i < 5; i++) {
            var temp = randomTime(100000);
            test("unit test: correct time for " + temp + " seconds", () => {
                render(<StopWatch time={temp} />);
                expect(screen.getByText(timeGenerator(temp))).toBeInTheDocument();
            });
        }

        // Unit test, checks if the list of laps renders correctly when given props with a random list of laps (tested 5 times)
        for (let i = 0; i < 5; i++) {

            // Creates a list of random length (0-9 items) with random absolute times (0-10000s) and random lap times (0-10000s)
            var timeListInput = [];
            for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
                timeListInput.push({lapNumber: j, absTime: randomTime(10000), lapTime: randomTime(10000)});
            }

            // Tests if the lap counter, absolute time, and lap time all get displayed correctly
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

        // Integration test, random presses the start, stop, and reset buttons, waits a random interval and then checks if the correct value is displayed on the stopwatch (tested 5 times)
        for (let i = 0; i < 5; i++) {

            // Creates a list of random length (0-9 items), with random button presses (Start, Stop, or Reset), and random time intervals (0-1000s) 
            var actionList = [];
            var newButtonList = ["Start", "Stop", "Reset"];
            for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
                actionList.push({button: newButtonList[Math.floor(Math.random() * 3)], deltaTime: randomTime(1000)});
            }

            // Start by rendering <App />, saving the clockElement, and creating a variable that stores the currentTime on the clock
            test("integration test: testing random combinations of start, stop, and reset with " + JSON.stringify(actionList) + " data", () => {
                render(<App />);
                const clockElement = screen.getByTestId("timer-text");
                var currentTime = 0;

                // For every item in actionList, press the correct button and wait the correct amount of time
                for (let j = 0; j < actionList.length; j++) {
                    fireEvent.click(screen.getByText(actionList[j].button));
                    act(() => jest.advanceTimersByTime(actionList[j].deltaTime * 1000));

                    // If the button pressed was Start then increase the currentTime, if the button pressed was Stop then do nothing, and if the button pressed was reset, set currentTime to 0
                    if (actionList[j].button === "Start") {
                        currentTime += actionList[j].deltaTime;
                    }
                    if (actionList[j].button === "Reset") {
                        currentTime = 0;
                    }

                    // Check if the correct amount of time is displayed on screen
                    expect(clockElement).toHaveTextContent(timeGenerator(currentTime));
                }
            });
        }

        // Integration test, randomly presses the Lap button when the clock is running and checks if the correct lap info gets displayed (tested 5 times)
        for (let i = 0; i < 5; i++) {

            // Creates a list of random length (0-9 items), with random time intervals (0-1000s)
            var lapIntervalsList = [];
            for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
                lapIntervalsList.push(randomTime(1000));
            }

            // Start by rendering <App />, pressing start, and initializing totalTime
            test("integration test: testing lap test random intervals from " + JSON.stringify(lapIntervalsList) + " lap list", () => {
                render(<App />);
                fireEvent.click(screen.getByText("Start"));
                var totalTime = 0;

                // For every item in lapIntervalsList, wait the randomized amount of time, press the lap button, update totalTime and then check if everything gets displayed correctly
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