import '@testing-library/jest-dom/'
import React from 'react';
import { render, screen } from '@testing-library/react';

import { DigitalDisplay } from '../DigitalDisplay'; // Adjust the import path as needed.
import { StopWatchContext } from "../";
import { useStopWatch } from '../hooks';
describe('DigitalDisplay Component', () => {
        const defaultResolutions = [{ divisor: 60000, modulus: 60 }, { divisor: 1000, modulus: 60 }, { divisor: 1, modulus: 100 }];

    it('renders correctly with required props', () => {
        const TestComponent = () => {
            const StopWatchController = useStopWatch({resolutions:defaultResolutions});
            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <DigitalDisplay milliseconds={5000}/>
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);
        // Assertions to check if the component renders correctly
        expect(screen.getByText(':05')).toBeInTheDocument();
        expect(screen.getByTestId('digital-display-container')).toBeInTheDocument();
    });

    it('applies default styles when no containerStyles are passed', () => {
        const TestComponent = () => {
            const StopWatchController = useStopWatch({resolutions:defaultResolutions});
            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <DigitalDisplay milliseconds={5000}/>
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);        
        // Checking if the default styles are applied
        const container = screen.getByTestId('digital-display-container');
        expect(container).toHaveStyle('display: flex');
        expect(container).toHaveStyle('flexDirection: row');
        expect(container).toHaveStyle('justifyContent: center');
        expect(container).toHaveStyle('alignItems: center');
    });

    it('overrides default styles with custom containerStyles', () => {
        const customStyles = { justifyContent: 'flex-start' };
        const TestComponent = () => {
            const StopWatchController = useStopWatch({resolutions:defaultResolutions});
            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <DigitalDisplay containerStyles={customStyles} milliseconds={5000}/>
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);        
        const container = screen.getByTestId('digital-display-container');
        expect(container).toHaveStyle('justifyContent: flex-start');
    });

    it('renders lap time correctly when isLap is true', () => {
        const TestComponent = () => {
            const StopWatchController = useStopWatch({resolutions:defaultResolutions});
            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <DigitalDisplay isLap milliseconds={5000}/>
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);
        // Expect paragraph tags instead of h1 for lap time
        expect(screen.getByTestId('lap-display-container')).toBeInTheDocument();
    });
    

    it('renders correctly with custom Resolutions', () => {
        const customResolutions = [{ divisor: 60000, modulus: 60 }, { divisor: 1000, modulus: 60 }, { divisor: 1, modulus: 100 }];
        const TestComponent = () => {
            const StopWatchController = useStopWatch({resolutions:customResolutions});
            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <DigitalDisplay milliseconds={60000}/>
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);
        //Assert minutes are displayed correctly
        expect(screen.getByText('01')).toBeInTheDocument();
        //Assert seconds are displayed correctly
        expect(screen.getByText(':00')).toBeInTheDocument();
        //Assert milliseconds are displayed correctly
        expect(screen.getByText('.00')).toBeInTheDocument();
    });


});