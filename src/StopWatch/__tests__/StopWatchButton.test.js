import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from './../StopWatchButton';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import '@testing-library/jest-dom';

describe("StopWatchButton function", () => {
    it("should render FontAwesomeIcon with given icon", () => {
        const { queryByTestId } = render(<StopWatchButton onClick={() => {}} icon={faPlay} testId='stopwatch-button' />);
        expect(queryByTestId('stopwatch-button')).toBeInTheDocument();
    });

    it("should handle 'onClick' when clicked", () => {
        const handleClick = jest.fn();
        const { getByTestId } = render(<StopWatchButton onClick={handleClick} icon={faPlay} testId='stopwatch-button' />);
        fireEvent.click(getByTestId('stopwatch-button'));
        expect(handleClick).toHaveBeenCalled();
    });
});