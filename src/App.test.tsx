import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import { start } from 'repl';

jest.mock('./styles.css', () => {
    return {}
})
jest.mock('../public/Shopify-Logo.png', () => {
    return {}
  })

test('start button should become stop button after click', async() => {
    render(<App></App>);
    const startButton = screen.getByRole("button", {name: /Start/i});
    expect(startButton).toBeTruthy;
});