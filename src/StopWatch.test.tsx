import React from 'react';
import {render, fireEvent, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './StopWatch'
import { timeCalculation, formatTimeUnit } from './StopWatch';

//Test functionality of the time calculation function
describe('timeCalculation', () => {
    it('should correctly convert milliseconds to appropriate time', () => {
        const timeInMilliseconds = 3661000; 
        const expectedOutput = ['01', '01', '01', '00']; 
        const result = timeCalculation(timeInMilliseconds);

        expect(result).toEqual(expectedOutput);
    });
});

//Test functionality of the formatTimeUnit function
describe('formatTimeUnit', () => {
    it('should prepend 0 if the unit is less than 10', () => {
        expect(formatTimeUnit(3)).toBe('03');
        expect(formatTimeUnit(0)).toBe('00');
    });

    it('should not prepend 0 if the unit is 10 or more', () => {
        expect(formatTimeUnit(10)).toBe(10);
        expect(formatTimeUnit(25)).toBe(25);
    });
});

//Testing if the stop watch renders
describe('StopWatch', () => {
    it('renders without crashing', () => {
        render(<StopWatch />);
    });
});