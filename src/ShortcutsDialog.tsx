import React from "react";
import { styled } from "@mui/material/styles";
import { ShortcutsDialogProps } from "./types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const ControlIcon = styled(KeyboardControlKeyIcon)({
	fontSize: "16px",
	borderRadius: "5px",
	padding: "5px",
	boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
	border: "3px solid #34445B",
	color: "#34445B",
});

const Icon = styled("div")({
	height: "16px",
	width: "16px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "5px",
	padding: "5px",
	boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
	border: "3px solid #34445B",
	color: "#34445B",
});

const ShortcutsDialog = ({ onClose, open }: ShortcutsDialogProps) => {
	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>Keyboard Shortcuts</DialogTitle>
			<List sx={{ pt: 0 }}>
				<ListItem style={{ gap: "10px" }}>
					<ListItemText primary={"Start/Stop stopwatch"} />
					<div style={{ display: "flex", gap: "3px" }}>
						<ControlIcon />
						<Icon>s</Icon>
					</div>
				</ListItem>
				<Divider />
				<ListItem style={{ gap: "10px" }}>
					<ListItemText primary={"Reset stopwatch"} />
					<div style={{ display: "flex", gap: "3px" }}>
						<ControlIcon />
						<Icon>r</Icon>
					</div>
				</ListItem>
				<Divider />
				<ListItem style={{ gap: "10px" }}>
					<ListItemText primary={"Lap stopwatch"} />
					<div style={{ display: "flex", gap: "3px" }}>
						<ControlIcon />
						<Icon>l</Icon>
					</div>
				</ListItem>
			</List>
		</Dialog>
	);
};

export default ShortcutsDialog;
