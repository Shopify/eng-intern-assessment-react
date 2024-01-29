import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import React from 'react';
import StopWatchButton from './StopWatchButton';

test('render', () => {
	const { getByRole } = render(
		<StopWatchButton onClick={() => null}>text</StopWatchButton>
	);
	expect(getByRole('button')).not.toBeNull();
});

// test('handle Click', () => {
// 	const onClick = jest.fn();
// 	const { getByRole } = render(
// 		<StopWatchButton onClick={() => onClick}>text</StopWatchButton>
// 	);

// 	fireEvent.click(getByRole('button', { name: /start/i }));

// 	expect(onClick).toHaveBeenCalled();
// });
