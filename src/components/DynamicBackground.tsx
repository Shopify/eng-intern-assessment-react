import React, { useEffect } from 'react';
import '../styles/DynamicBackground.css';

function DynamicBackground() {
    useEffect(() => {
        // Select the interactive element in the DOM for animation effect
        const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
        let curX = 0; 
        let curY = 0; 
        let tgX = 0; 
        let tgY = 0; 

        // Move function animates the bubble element by updating its position
        function move() {
            // Gradually adjust current position towards the target position
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            // Apply the calculated position to the element's transform property for smooth animation
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            // Use requestAnimationFrame for smooth and efficient animation loop
            requestAnimationFrame(move);
        }

        // Mouse move event listener to update target position
        window.addEventListener('mousemove', (event) => {
            tgX = event.clientX; 
            tgY = event.clientY; 
        });

        move(); 
    }, []);

    return (
        <div className="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        {/* SVG filter to create a gooey effect */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        {/* Color matrix to fine-tune the blur effect */}
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        {/* Blend filter to merge graphic and goo effect */}
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="gradients-container">
                {/* Gradient elements for visual effect */}
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
                {/* Interactive element that follows the mouse */}
                <div className="interactive"></div>
            </div>
        </div>
    );
}

export default DynamicBackground;
