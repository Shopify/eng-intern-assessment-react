import React from 'react'
import styled from 'styled-components'


type ButtonProps = {
  label: string;  //Text in the button
  color: string;  //Color of the button
  onClick: () => void;  //Function to be called when the button is clicked
};

//StopWatchButton component
const StopWatchButton: React.FC<ButtonProps> = ({ label, onClick, color }) => (
    <StyledButton
        onClick={onClick}
        style={{ backgroundColor: color }}
    >
        {label}
    </StyledButton>
);

// Styled Component to be used as a template for the styling of the StopWatchButton
const StyledButton = styled.button`
    width: 80%;
    height: 50%;
    border: none;
    margin: 4vw;
    border-radius: 15px;
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.30);

    font-size: 2.1vw;
    font-style: normal;
    font-family: 'Kadwa', serif;
    font-weight: 400;
    line-height: normal;

    &:hover {
    filter: brightness(90%);
    cursor: pointer;
    }
`;


export default StopWatchButton;


