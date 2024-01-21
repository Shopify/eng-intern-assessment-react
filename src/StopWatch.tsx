import React, { useEffect } from "react";
import { useState } from "react";
import StopWatchButton from "./StopWatchButton";
import { Container, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		fontFamily: ["Orbitron", "regular"].join(","),
	},
});

function displayTimerValue(value: number) {
	return value.toString().padStart(2, "0");
}

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

export default function StopWatch() {
	const [time, setTime] = useState(0);
	const [active, setActive] = useState(false);
	const [laps, setLaps] = useState([]);

	const startClicked = () => {
		setActive(true);
	};

	const stopClicked = () => {
		setActive(false);
	};

	const resetClicked = () => {
		setActive(false);
		setTime(0);
		setLaps([]);
	};

	const lapClicked = () => {
		if (active) {
			setLaps((laps) => [...laps, time]);
		}
	};

	useEffect(() => {
		let addTime: NodeJS.Timeout;
		if (active) {
			addTime = setInterval(() => setTime(time + 1), 10);
		}
		return () => clearInterval(addTime);
	}, [time, active]);

	return (
		<Container style={{ paddingBottom: "40px" }}>
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
							{formatTime(time)}
						</Typography>
					</div>
				</div>

				<Grid container spacing={2} justifyContent="center" alignItems="center">
					<Grid item>
						<StopWatchButton
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
				<hr style={{ margin: "30px" }} />
				<Typography variant="h5" gutterBottom align="left">
					Laps:
				</Typography>
				<ol data-testid="lapslist">
					{laps.map((lap, index) => (
						<li key={index}>{formatTime(lap)}</li>
					))}
				</ol>
			</ThemeProvider>
		</Container>
	);
}
