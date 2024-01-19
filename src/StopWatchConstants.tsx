import React from "react";

// for further localization if needed
export const buttonContent = {
    start: "Start",
    stop: "Stop",
    lap: "Lap",
    reset: "Reset",
}

export const startButtonStyle: React.CSSProperties = {
    border: "3px solid #0A2A12",
    backgroundColor: "#0A2A12",
    color: "#45CA57",
}

export const stopButtonStyle: React.CSSProperties = {
    border: "3px solid #330E0A",
    backgroundColor: "#330E0A",
    color: "#EB524C",
}

export const resetButtonStyle: React.CSSProperties = {
    border: "3px solid #323232",
    backgroundColor: "#323232",
    color: "white",
}

export const resetButtonStyleDisabled: React.CSSProperties = {
    border: "3px solid #1C1B1E",
    backgroundColor: "#1C1B1E",
    color: "#99989C",
}

export const buttonSectionStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "-5vh",
    marginBottom: "5vh",
}

export const lapSectionStyle: React.CSSProperties = {
    listStyleType: "none",
    margin: "0",
    padding: "0",
    overflow: "auto",
    paddingLeft: "30px",
    paddingRight: "30px",
}

export const overallStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "90vh"
}