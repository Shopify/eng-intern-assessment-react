/**
 * This file contains the unit tests for the App component and its child components.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';
import App from './App';

// This is my first time using Jest and React Testing Library, so I had to do some research on how to test components.

/**
 * This is my first time using Jest and React Testing Library, so I had to do some research
 *  on how to test components. I know it's not perfect, but I hope it shows my willingness to learn new
 * technologies and my ability to adapt quickly depending on the needs of the project.
 */

// Set timeout for tests
jest.setTimeout(30000);

/**
 * Test suite for the Stopwatch component.
 */
describe('Stopwatch', () => {

    /**
     * Test case to verify that the Stopwatch component loads with the initial time displayed.
     */
    test('loads', async () => {
        render(<App />);
        
        await screen.findByText('Stopwatch');
        
        await screen.findByRole('title_heading');
        await screen.findByRole('lap_count');
        await screen.findByText('0 : 0 : 0');

        expect(screen.getByRole('title_heading')).toHaveTextContent("Stopwatch");
        expect(screen.getByText('0 : 0 : 0')).toHaveClass("CircularProgressbar-text");
        expect(screen.getByRole('lap_count')).toHaveTextContent("Lap 0");
    });

    /**
     * Test case to verify that the Stopwatch component starts counting when the start button is clicked.
     */
    test('starts', async () => {
        render(<App />);

        const { container } = render(<App />);

        await userEvent.click(screen.getAllByTestId('start_button')[1]);

        await screen.getAllByTestId('radial_element');

        expect(container.getElementsByClassName("CircularProgressbar-text")[0]).toBeVisible();
        await new Promise((r) => setTimeout(r, 1000));
        expect(container.getElementsByClassName("CircularProgressbar-text")[0]).not.toHaveTextContent("0 : 0 : 0");
    });

    /**
     * Test case to verify that a lap is recorded when the lap button is clicked.
     */
    test('laps', async () => {
        render(<App />);

        const { container } = render(<App />);

        await userEvent.click(screen.getAllByTestId('start_button')[1]);

        await screen.getAllByTestId('radial_element');

        expect(container.getElementsByClassName("CircularProgressbar-text")[0]).toBeVisible();
        await new Promise((r) => setTimeout(r, 1000));

        await userEvent.click(screen.getAllByTestId('lap_button')[0]);
        const num = container.getElementsByClassName("CircularProgressbar-text")[0].textContent;
        const seconds = Number(num?.split(" : ")[1]);
        expect(seconds).toBeLessThan(1);

        await screen.findAllByTestId("lap_list");
        await screen.findAllByTestId("lap_indicator");

        expect(screen.getAllByTestId("lap_list")[0].children.length).toBeGreaterThan(0);
        expect(screen.getAllByTestId("lap_list")[0].children[1]).toHaveTextContent("0 - 0 : 0 : 0");
        expect(screen.getAllByTestId("lap_indicator")[0]).toHaveTextContent("Lap 1");
    });

    /**
     * Test case to verify that the Stopwatch component stops counting when the stop button is clicked.
     */
    test('stops', async () => {
        render(<App />);

        const { container } = render(<App />);

        await userEvent.click(screen.getAllByTestId('start_button')[1]);

        await screen.getAllByTestId('radial_element');

        expect(container.getElementsByClassName("CircularProgressbar-text")[0]).toBeVisible();
        await new Promise((r) => setTimeout(r, 1000));

        await userEvent.click(screen.getAllByTestId('stop_button')[1]);
        const num = container.getElementsByClassName("CircularProgressbar-text")[0].textContent;

        await new Promise((r) => setTimeout(r, 500));
        expect(container.getElementsByClassName("CircularProgressbar-text")[0]).toHaveTextContent(num);
    });

    /**
     * Test case to verify that the Stopwatch component resets to the initial time when the reset button is clicked.
     */
    test('resets', async () => {
        render(<App />);

        const { container } = render(<App />);

        await userEvent.click(screen.getAllByTestId('start_button')[1]);

        await screen.getAllByTestId('radial_element');

        expect(container.getElementsByClassName("CircularProgressbar-text")[0]).toBeVisible();
        await new Promise((r) => setTimeout(r, 1000));

        await userEvent.click(screen.getAllByTestId('reset_button')[1]);

        expect(container.getElementsByClassName("CircularProgressbar-text")[0]).toHaveTextContent("0 : 0 : 0");
    });
});
