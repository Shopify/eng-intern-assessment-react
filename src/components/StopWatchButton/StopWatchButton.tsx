import React {useState, useEffect}from "react";
import "./StopWatchButton.scss"; 

interface ButtonProps {
	text: string;
	className: string;
}


export default function StopWatchButton({text, className, clickHandler}) {

	return <div>
		<button className={`button ${{buttonClassName}}`} onClick={clickHandler}>{buttonText}</button>
	</div>;
}
