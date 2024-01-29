import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import React from 'react';
import StopWatchButton from './StopWatchButton';

test('render', () => {
	const { getByText } = render(
		<StopWatchButton onClick={() => null}>text</StopWatchButton>
	);
	expect(getByText('Stopwatch')).not.toBeNull();
});

