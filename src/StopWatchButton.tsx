import React from "react";
import { Button } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

/**
 * Component that dynamically takes 3 props and returns a button that does a timer-specific function.
 * @param buttonAction A function that the button will execute on click
 * @param buttonName The name of the button
 * @param buttonTheme The theme of the button. This is the variant keyword like "success", "error", etc.
 * @returns
 */
export default function StopWatchButton({
	buttonAction,
	buttonName,
	buttonTheme,
}: any) {
	// Function with a switch-case to match a button name to its corresponding icon.
	const getButtonIcon = (buttonName: any) => {
		switch (buttonName) {
			case "start":
				return <TimerIcon />;
			case "stop":
				return <TimerOffIcon />;
			case "reset":
				return <RestartAltIcon />;
			case "lap":
				return <SportsScoreIcon />;
			default:
				break;
		}
	};

	return (
		<div>
			<Button
				variant="contained"
				startIcon={getButtonIcon(buttonName)}
				color={buttonTheme}
				size="large"
				onClick={() => buttonAction()}
				data-testid={buttonName}
			>
				{buttonName.toUpperCase()}
			</Button>
		</div>
	);
}
