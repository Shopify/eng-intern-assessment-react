/**
 * @file styles.ts
 * @desc Custom CSS for various components of the stopwatch app
 * @author Hadi Naqvi
 */

import { CSSProperties } from 'react';

// Nord theme colors
const nordColours = {
    darkBackground: "#2E3440",
    background: "#4C566A",
    blue: "#5E81AC",
    text: "#eceff4",
    border: "#4c566a",
    yellow: "#EBCB8B",
    red: "#BF616A",
    green: "#A3BE8C",
};

// Style for the main app container
export const containerStyle: CSSProperties = {
    backgroundColor: nordColours.darkBackground,
    display: "grid",
    placeItems: "center",
    height: "100vh",
};

// Style for the stopwatch container
export const stopwatchContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: nordColours.background,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    width: "20%",
    minWidth: "300px",
};

// Style for the buttons container
export const buttonsContainerStyle: CSSProperties = {
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "row",
};

// Style for the stopwatch control buttons
export const buttonStyle = (colour: string): CSSProperties => {
    return {
        backgroundColor: eval('nordColours.' + colour),
        color: nordColours.text,
        padding: "30px 45px",
        margin: "0 15px",
        borderRadius: "6px",
        cursor: "pointer",
        border: "none",
        fontSize: "1.5rem",
        fontFamily: "Roboto, sans-serif",
        transition: "background-color 0.1s ease-in-out"
    }
};

// Style for the stopwatch time display
export const timeStyle: CSSProperties = {
    fontSize: "2.5rem",
    margin: "15px 0",
    color: nordColours.text,
};

// Style for the laps display
export const lapsStyle: CSSProperties = {
    fontSize: "1.2rem",
    color: nordColours.yellow,
    marginTop: "10px",
};

// Style for the main title
export const titleStyle: CSSProperties = {
    fontSize: "5rem",
    margin: "15px 0",
    color: nordColours.text,
    fontFamily: "Roboto, sans-serif",
}