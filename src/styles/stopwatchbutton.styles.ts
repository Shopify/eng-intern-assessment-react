import { styled } from "@mui/material/styles";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";

const ButtonWrap = styled("div")({
	height: "150px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	boxSizing: "border-box",
	gap: "15px",
});

const StartStopButton = styled("button")({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	outline: "none",
	cursor: "pointer",
	fontSize: "16px",
	fontWeight: 600,
	lineHeight: "16px",
	padding: "2px 16px",
	height: "54px",
	width: "125px",
	border: "none",
	color: "#fff",
	backgroundColor: "#34445B",
	letterSpacing: "4px",
	transition: "background-color .17s ease,color .17s ease",
	"&:hover": {
		backgroundColor: "#496183",
	},
});
const ResetLapButton = styled("button")({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	outline: "none",
	cursor: "pointer",
	fontSize: "16px",
	fontWeight: 700,
	lineHeight: "16px",
	padding: "2px 16px",
	height: "54px",
	width: "125px",
	color: "#34445B",
	backgroundColor: "transparent",
	border: "4px solid #34445B",
	letterSpacing: "4px",
	transition: "background-color .17s ease,color .17s ease",
	"&:hover": {
		backgroundColor: "#34445B",
		color: "white",
	},
});

const StartIcon = styled(PlayCircleFilledWhiteIcon)({
	color: "#34445B",
	fontSize: "90px",
	"&:hover": {
		cursor: "pointer",
	},
});
const StopIcon = styled(StopCircleIcon)({
	color: "#34445B",
	fontSize: "90px",
	"&:hover": {
		cursor: "pointer",
	},
});

export {
	ButtonWrap,
	StartStopButton,
	ResetLapButton,
	StartIcon,
	PlayCircleFilledWhiteIcon,
	StopCircleIcon,
	StopIcon,
};
