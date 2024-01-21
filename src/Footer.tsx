import React from "react";
import { Grid, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArticleIcon from "@mui/icons-material/Article";

export default function Footer() {
	return (
		// Creating a "sticky" footer that remains at the bottom of the page at all times
		<footer
			style={{
				position: "fixed",
				left: "0",
				bottom: "0",
				width: "100%",
				background: "#150866",
				padding: "20px",
			}}
		>
			{/* 1 Row and 3 column center-aligned grid */}
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				<Grid item>
					{/* A button that links to my GitHub */}
					<Button
						variant="contained"
						color="info"
						startIcon={<GitHubIcon />}
						href="https://github.com/MahinKukreja"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</Button>
				</Grid>
				<Grid item>
					{/* A button that links to my LinkedIn */}
					<Button
						variant="contained"
						color="info"
						startIcon={<LinkedInIcon />}
						href="https://www.linkedin.com/in/mahin-kukreja/"
						target="_blank"
						rel="noreferrer"
					>
						LinkedIn
					</Button>
				</Grid>
				<Grid item>
					{/* A button that links to my resume */}
					<Button
						variant="contained"
						color="info"
						startIcon={<ArticleIcon />}
						href="https://www.cs.ryerson.ca/~mskukrej/resume.pdf"
						target="_blank"
						rel="noreferrer"
					>
						Resume
					</Button>
				</Grid>
			</Grid>
		</footer>
	);
}
