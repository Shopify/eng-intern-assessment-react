import React, { MouseEventHandler, useState } from 'react'
import { StyledButton } from './StylingComponents/StyledButton'

interface StopWatchButtonInterface { onClick: MouseEventHandler, text: string, color: string, hover: string }

export default function StopWatchButton(props: StopWatchButtonInterface) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const buttonHover = {
        backgroundColor: isHovered ? props.color : props.hover,
        color: 'white'
    }
    return(
        <StyledButton
            style={buttonHover}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={props.onClick}
            >
            {props.text}
        </StyledButton>
    )
    
}