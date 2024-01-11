import { styled } from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";

const StopWatchWrap = styled("div")({
	display: "flex",
	height: "200px",
	width: "70%",
	alignItems: "center",
	justifyContent: "center",
});

const TimerBlock = styled("div")({
	minWidth: "200px",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
	background: "rgba(255, 255, 255, 0.6)",
	position: "relative",
});

const TimeTypeText = styled("small")({
	fontSize: "12px",
	letterSpacing: "5px",
	fontWeight: 700,
	position: "absolute",
	bottom: 10,
	color: "#34445B",
});

const TimeText = styled("small")({
	fontSize: "86px",
	fontWeight: "900",
	color: "#34445B",
});

const ColonWrap = styled("div")({
	height: "100%",
	minWidth: "60px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: "35px",
});

const Dot = styled(CircleIcon)({
	fontSize: "10px",
	color: "#B1BFD3",
});

const CentisecondsText = styled("small")({
	fontSize: "16px",
	right: "15px",
	color: "#34445B",
	position: "absolute",
	bottom: 66,
	fontWeight: 500,
});

export {
	StopWatchWrap,
	TimerBlock,
	TimeTypeText,
	TimeText,
	ColonWrap,
	Dot,
	CentisecondsText,
};
