import React from 'react';
// import "./style.css"

interface StopWatchButtonProps {
    //title is the text displayed on the button
    title: string;
    //func is the function called when the button is pressed
    func: () => void;
}
//StopWatchButton component uses the above interface to define the props it takes in
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ title, func }) => (
    //button with text title and function func called when pressed
    <button onClick={func}>{title}</button>
);

export default StopWatchButton;