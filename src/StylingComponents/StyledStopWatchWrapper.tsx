import React, { useEffect, useState } from 'react';

type StyledStopWatchWrapperProps = {
    children?: React.ReactNode;
};

export default function StyledStopWatchWrapper({ children }: StyledStopWatchWrapperProps) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Function to update state on window resize
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth]);

    const divStyling: React.CSSProperties = {
        width: width < 768 ? '85vw' : '35vw',
        margin:"auto",
        marginTop: "5rem",
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontFamily: 'sans-serif',
        textAlign: 'center',
    };

    return (
        <div style={divStyling}>
            {children}
        </div>
    );
}