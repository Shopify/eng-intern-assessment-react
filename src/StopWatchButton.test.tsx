import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatchButton from './StopWatchButton';

describe('StopWatchButton tests', () => {
    it('render should match snapshot file', () => {
        const tree = renderer.create(<StopWatchButton label = 'STOP' disabled={false} action={jest.fn()} buttonClassName='btn'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should invoke the action function when the button is clicked', () => {
        const action = jest.fn();
        render(<StopWatchButton label = 'GO' disabled = {false} action={action} buttonClassName='btn'/>);
        expect(screen.getByText('GO')).toBeInTheDocument();
        fireEvent.click(screen.getByText('GO'));
        expect(action).toHaveBeenCalledTimes(1);
    })

})