import React from "react";
import { Button } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

export default function StopWatchButton({
	buttonAction,
	buttonName,
	buttonTheme,
}: any) {
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
