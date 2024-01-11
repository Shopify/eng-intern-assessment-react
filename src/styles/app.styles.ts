import { styled } from "@mui/material/styles";

const PageContainer = styled("div")({
	width: "100%",
	height: "100vh",
	margin: 0,
	zIndex: 2,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
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
		backdropFilter: "blur(1px)",
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

export { PageContainer, BackgroundContainer, TitleText, TitleWrap };
