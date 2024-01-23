import '@testing-library/jest-dom/'

import React from 'react';
import { render, screen } from '@testing-library/react';
import { StopWatchContext } from "../"
import { useStopWatch } from '../hooks';
import { AnalogDisplay } from './AnalogDisplay'; // Adjust the import path as needed.

describe('AnalogDisplay Component', () => {
    it('renders correctly with required props', () => {
        const TestComponent = () => {
            const StopWatchController = useStopWatch({});
            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <AnalogDisplay complication/>
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);

        // Assertions to check if the component renders correctly
        expect(screen.getByTestId('analog-clock-container')).toBeInTheDocument();
        expect(screen.getByTestId('clock')).toBeInTheDocument();
        expect(screen.getByTestId('second-hand')).toBeInTheDocument();
        // expect(screen.getByTestId('complication')).toBeInTheDocument();
    });

    it('applies default styles when no styles are passed', () => {
        const TestComponent = () => {
            const StopWatchController = useStopWatch({});
            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <AnalogDisplay complication/>
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);
        
        // Checking if the default styles are applied
        const container = screen.getByTestId('analog-clock-container');
        const clock = screen.getByTestId('clock');
        expect(container).toHaveStyle('position: relative');
        expect(container).toHaveStyle('display: flex');
        expect(container).toHaveStyle('justifyContent: center');
        expect(container).toHaveStyle('alignItems: center');

        expect(clock).toHaveStyle('position: relative');
        expect(clock).toHaveStyle('width: 300px');
        expect(clock).toHaveStyle('height: 300px');
        expect(clock).toHaveStyle('border: 12px solid #343232');
        expect(clock).toHaveStyle('borderRadius: 100%');
    });

    

    it('overrides default styles with custom styles', () => {
        jest.useFakeTimers();
        const customStyles = { clockSize: 500, faceColor: 'blue', borderWidth: 20, borderColor: 'black', borderRadius: "50%" };
        const TestComponent = () => {
            const StopWatchController = useStopWatch({});

            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <AnalogDisplay complication {...customStyles}/>
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);        
        const container = screen.getByTestId('analog-clock-container');
        expect(container).toHaveStyle('width: 535px');
        expect(container).toHaveStyle('height: 535px');
        expect(container).toHaveStyle('backgroundColor: blue');

        const clock = screen.getByTestId('clock');
        expect(clock).toHaveStyle('width: 500px');
        expect(clock).toHaveStyle('height: 500px');
        expect(clock).toHaveStyle('border: 20px solid black');
        expect(clock).toHaveStyle('borderRadius: 50%');
    });

    it('does not render complication when complication prop is false', () => {
        const TestComponent = () => {
            const StopWatchController = useStopWatch({});

            return (
                <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                    <AnalogDisplay complication={false} />
                </StopWatchContext.Provider>
            );
        };
        render(<TestComponent />);
        // Expect complication not to be in the document
        expect(screen.queryByTestId('complication')).not.toBeInTheDocument();
    });

    //Make sure secondhand translation is correct over time

    it('renders second hand correctly', () => {

        render(<AnalogDisplay milliseconds={15000} laps={[15000,10000]} darkTheme={true} complication />);
        // Expect second hand to be at 90 degrees after 15 seconds
        expect(screen.getByTestId('second-hand')).toHaveStyle('transform: rotate(90deg)');

    });


});