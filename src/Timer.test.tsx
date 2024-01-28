import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Timer from './Timer';

describe('Timer tests', () => {
    it('render should match snapshot file', () => {
        const tree = renderer.create(<Timer timeInMs={2500}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should result in correct time display value', () => {
        render(<Timer timeInMs={3500}/>);
        expect(screen.getByText('00:00:03.50')).toBeInTheDocument();
    });
});