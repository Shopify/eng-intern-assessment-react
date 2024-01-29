import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import React from 'react';
import StopWatchButton from './StopWatchButton';

test('render', () => {
	const { getByRole } = render(
		<StopWatchButton onClick={() => null}>text</StopWatchButton>
	);
	expect(getByRole('button')).not.toBeNull();
});

test('calls onClick', () => {
	const onClick = jest.fn();
	const { getByRole } = render(
		<StopWatchButton onClick={onClick} children='text' />
	);

	fireEvent.click(getByRole('button', { name: 'text' }));
	expect(onClick).toHaveBeenCalled();
});
