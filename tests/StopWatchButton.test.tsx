import React from "react";
import {render, fireEvent, act, getByTestId, getAllByText, getByRole} from "@testing-library/react";
import "@testing-library/jest-dom/";
import StopWatchButton from "../src/StopWatchButton";
import {buttonContent} from "../src/StopWatch";
import {randomInt} from "crypto";


describe("StopWatchButton", () => {
    const buttonStyle: React.CSSProperties = {
        border: "3px solid green",
        backgroundColor: "green",
        color: "yellow",
    };

    it("render button without crashing", () => {
        const {getByText} = render(<StopWatchButton buttonName={"test"} buttonFunction={() => {
        }} disabled={false} style={buttonStyle}/>);
        const button = getByText("test");

        //button should have correct attributes
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");
    });

    it("handle button hover", () => {
        const {getByText} = render(<StopWatchButton buttonName={"test"} buttonFunction={() => {
        }} disabled={false} style={buttonStyle}/>);
        const button = getByText("test");

        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");

        //when hovered it should have a ring with the same color as the text
        fireEvent.mouseEnter(button);
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");
        expect(button).toHaveStyle("box-shadow: 0 0 0 4px yellow inset");
    });

    it("handle button hover and leave", () => {
        const {getByText} = render(<StopWatchButton buttonName={"test"} buttonFunction={() => {
        }} disabled={false} style={buttonStyle}/>);
        const button = getByText("test");

        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");

        //when hovered, it should have a ring with the same color as the text
        fireEvent.mouseEnter(button);
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");
        expect(button).toHaveStyle("box-shadow: 0 0 0 4px yellow inset");

        //when not hovered, it should return to initial state
        fireEvent.mouseLeave(button);
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");
    });

    it("handle button pressed", () => {
        const {getByText} = render(<StopWatchButton buttonName={"test"} buttonFunction={() => {
        }} disabled={false} style={buttonStyle}/>);
        const button = getByText("test");

        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");

        //when pressed, background color should be darkened by a gradient
        fireEvent.mouseDown(button);
        expect(button).toHaveStyle("background-image: linear-gradient(rgb(0 0 0 / 40%) 0 0)");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");
    });

    it("handle button released", () => {
        const {getByText} = render(<StopWatchButton buttonName={"test"} buttonFunction={() => {
        }} disabled={false} style={buttonStyle}/>);
        const button = getByText("test");

        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");

        //when pressed, background color should be darkened by a gradient
        fireEvent.mouseDown(button);
        expect(button).toHaveStyle("background-image: linear-gradient(rgb(0 0 0 / 40%) 0 0)");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");

        //when released, background color should return to initial state
        fireEvent.mouseUp(button);
        expect(button).toHaveStyle("background-image:");
        expect(button).toHaveStyle("border: 3px solid green");
        expect(button).toHaveStyle("color: yellow");
        expect(button).toHaveStyle("background-color: green");
    });
});