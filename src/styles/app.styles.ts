import { styled } from "@mui/material/styles";

const PageContainer = styled("div")({
	width: "100%",
	height: "100%",
	margin: 0,
	zIndex: 2,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	flex: 1,
});

const BackgroundContainer = styled("div")({
	width: "100%",
	height: "100vh",
	margin: 0,
	display: "flex",
	backgroundImage:
		"url(https://images.pexels.com/photos/1007957/pexels-photo-1007957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	position: "relative",
	overflow: "hidden",

	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: "rgba(255, 255, 255, 0.7)",
		zIndex: 1,
	},
});

const TitleText = styled("h1")({
	fontSize: "26px",
	color: "#34445B",
	letterSpacing: "14px",
	textTransform: "uppercase",
	marginBottom: "60px",
});

const TitleWrap = styled("h1")({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexWrap: "wrap",
	gap: "35px",
});

const LapContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	width: "144px",
	height: "100%",
	gap: "5px",
	position: "absolute",
	right: 0,
	top: 0,
	overflow: "auto",
	overscrollBehavior: "contain",
	scrollSnapType: "y proximity",
	paddingRight: "10px",
});

const LapTime = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	height: "35px",
	flexShrink: 0,
	borderTop: "1px solid #B1BFD3",
	"&:first-child": {
		border: "none",
	},
	"&:last-child": {
		scrollSnapAlign: "end",
	},
});

const LapNumText = styled("small")({
	color: "#34445B",
	fontWeight: 600,
	letterSpacing: "1px",
});

const LapTimeText = styled("small")({
	color: "#34445B",
});

export {
	PageContainer,
	BackgroundContainer,
	TitleText,
	TitleWrap,
	LapContainer,
	LapTime,
	LapNumText,
	LapTimeText,
};
