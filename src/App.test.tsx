import { render, fireEvent, within, getAllByTestId } from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('./styles.css', () => {
    return {}
})
jest.mock('../public/Shopify-Logo.png', () => {
    return {}
  })

it('App starts with start button', async() => {
    const {getByText} = render(<App></App>);
    const startButton = getByText(/Start/i);
    expect(startButton).toBeTruthy();
});

it('Start button should become stop button after click', async() => {
    const {getByText} = render(<App></App>);
    const startButton = getByText(/Start/i);
    fireEvent.click(startButton);
    expect(getByText('Stop', {selector: 'button'})).toBeTruthy();
});

it('Lap button should add lap to the list', async()=>{
    const {getByTestId} = render(<App></App>);
    fireEvent.click(getByTestId("lap-button"));
    fireEvent.click(getByTestId("lap-button"));
    fireEvent.click(getByTestId("lap-button"));
    //Check if number of laps is correct
    const list = getByTestId("laps");
    const {getAllByRole} = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(3);
})