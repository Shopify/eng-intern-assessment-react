import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';
import { Buttons } from './StopWatch';

describe('render btns with correct text', () => {
    it('Start btn text', () => {
        const { getByRole } = render(<StopWatchButton type={Buttons.Start} onClick={() => { }} />);
        expect(getByRole('button').textContent).toBe('Start');
    })
    it('Stop btn text', () => {
        const { getByRole } = render(<StopWatchButton type={Buttons.Stop} onClick={() => { }} />);
        expect(getByRole('button').textContent).toBe('Stop');
    })
    it('Reset btn text', () => {
        const { getByRole } = render(<StopWatchButton type={Buttons.Reset} onClick={() => { }} />);
        expect(getByRole('button').textContent).toBe('Reset');
    })
    it('Lap btn text', () => {
        const { getByRole } = render(<StopWatchButton type={Buttons.Lap} onClick={() => { }} />);
        expect(getByRole('button').textContent).toBe('Lap');
    })
})

describe('testing btn clicks', () => {
    it('Start btn calls onClick correctly', () => {
        const mockClick = jest.fn();
        render(<StopWatchButton type={Buttons.Start} onClick={mockClick} />);
        fireEvent.click(screen.getByRole('button', { name: /start/i }));
        expect(mockClick).toHaveBeenCalled();
    });
    it('Stop btn calls onClick correctly', () => {
        const mockClick = jest.fn();
        render(<StopWatchButton type={Buttons.Stop} onClick={mockClick} />);
        fireEvent.click(screen.getByRole('button', { name: /stop/i }));
        expect(mockClick).toHaveBeenCalled();
    });
    it('Reset btn calls onClick correctly', () => {
        const mockClick = jest.fn();
        render(<StopWatchButton type={Buttons.Reset} onClick={mockClick} />);
        fireEvent.click(screen.getByRole('button', { name: /reset/i }));
        expect(mockClick).toHaveBeenCalled();
    });
    it('Lap btn calls onClick correctly', () => {
        const mockClick = jest.fn();
        render(<StopWatchButton type={Buttons.Lap} onClick={mockClick} />);
        fireEvent.click(screen.getByRole('button', { name: /lap/i }));
        expect(mockClick).toHaveBeenCalled();
    });
})