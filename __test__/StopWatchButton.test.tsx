import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatchButton from '../src/StopWatchButton'

describe('StopWatchButton', () => {
	test("this section contains a button", () => {
		render(<StopWatchButton />);
        const element = screen.getByRole('button', { name: 'Start' });
        expect(element).toBeInTheDocument();
	});
});

