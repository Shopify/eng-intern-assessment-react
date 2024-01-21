import React, { useEffect } from "react";
import { useState } from "react";
import StopWatchButton from "./StopWatchButton";
import { Container, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

// Creating a custom theme for dark mode and a custom font
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		fontFamily: ["Orbitron", "regular"].join(","),
	},
});

/**
 * Function to pad the values of the timer with 0s to appear like a traditional timer
 *
 * @param value - The number value (hours/minutes/seconds/milliseconds)
 * @returns If `value` is less than 10, an extra 0 is prepended to the string. Otherwise `value` is returned as a string
 *
 */
function displayTimerValue(value: number) {
	return value.toString().padStart(2, "0");
}

/**
 * Function to format the time elapsed in milliseconds into HH:MM:SS.MS
 *
 * @param time - The number of milliseconds elapsed
 * @returns A string that formats the `time` into the format HH:MM:SS.MS
 *
 */
function formatTime(time: number) {
	let milliseconds = time % 100;
	time = (time - milliseconds) / 100;
	let seconds = time % 60;
	time = (time - seconds) / 60;
	let minutes = time % 60;
	let hours = (time - minutes) / 60;

	return `${displayTimerValue(hours)}:${displayTimerValue(
		minutes
	)}:${displayTimerValue(seconds)}.${displayTimerValue(milliseconds)}`;
}

/**
 * Overarching parent component that handles calculation and display of the timer.
 */

export default function StopWatch() {
	// Holds total elapsed milliseconds where the timer is incrementing.
	const [time, setTime] = useState(0);
	// Holds whether the timer is active and time is being incremented.
	const [active, setActive] = useState(false);
	// State array that holds all the user-inputted laps.
	const [laps, setLaps] = useState([]);

	// Function that child component StopWatchButton uses to turn the timer active.
	const startClicked = () => {
		setActive(true);
	};

	// Function that child component StopWatchButton uses to turn the timer inactive.
	const stopClicked = () => {
		setActive(false);
	};

	// Function that child component StopWatchButton uses to reset the time elapsed to 0, disable the timer, and delete all saved laps.
	const resetClicked = () => {
		setActive(false);
		setTime(0);
		setLaps([]);
	};

	// Function that child component StopWatchButton uses to record a lap only if the StopWatch is active.
	const lapClicked = () => {
		if (active) {
			setLaps((laps) => [...laps, time]);
		}
	};

	useEffect(() => {
		let addTime: NodeJS.Timeout;
		// While active, increment the timer each millisecond.
		if (active) {
			addTime = setInterval(() => setTime(time + 1), 10);
		}
		return () => clearInterval(addTime);
	}, [time, active]); // Includes `time` and `active` as these are referenced inside the useEffect function.

	return (
		<Container style={{ paddingBottom: "50px", background: "#0e0e1f" }}>
			<Typography
				variant="h3"
				gutterBottom
				align="center"
				style={{ paddingTop: "50px" }}
				data-testid="title"
			>
				Frontend Engineering Technical Challenge
			</Typography>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<div
					style={{
						width: "80%",
						margin: "auto",
						borderRadius: "25px",
						background:
							"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
					}}
				>
					<div
						style={{
							width: "75%",
							margin: "auto",
						}}
					>
						<Typography variant="h1" gutterBottom data-testid="timer">
							{/* Display time elapsed in HH:MM:SS.MS */}
							{formatTime(time)}
						</Typography>
					</div>
				</div>

				<Grid container spacing={2} justifyContent="center" alignItems="center">
					<Grid item>
						<StopWatchButton
							// If the timer is active, the start button will turn into a stop button.
							buttonAction={active == true ? stopClicked : startClicked}
							buttonName={active == true ? "stop" : "start"}
							buttonTheme={active == true ? "error" : "success"}
						/>
					</Grid>
					<Grid item>
						<StopWatchButton
							buttonAction={resetClicked}
							buttonName="reset"
							buttonTheme={"warning"}
						/>
					</Grid>
					<Grid item>
						<StopWatchButton
							buttonAction={lapClicked}
							buttonName="lap"
							buttonTheme={"secondary"}
						/>
					</Grid>
				</Grid>
				{/* If the user has inputted a lap, a proper section will be rendered with a list detailing the time of each lap. */}
				{laps.length > 0 ? (
					<>
						<hr style={{ margin: "30px" }} />
						<Typography variant="h5" gutterBottom align="left">
							Laps:
						</Typography>
						<ol data-testid="lapslist">
							{/* Go through the list of lap times and render them in input order in the HH:MM:SS.MS format */}
							{laps.map((lap, index) => (
								<li key={index}>{formatTime(lap)}</li>
							))}
						</ol>
					</>
				) : (
					<></>
				)}
			</ThemeProvider>
		</Container>
	);
}
