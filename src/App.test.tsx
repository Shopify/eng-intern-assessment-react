import React from 'react'
import { act, fireEvent, render, screen } from "@testing-library/react";
import App from './App';
import '@testing-library/jest-dom';


test('Render  App', () => {
    render(<App/>);
    const title =screen.getByText('Stopwatch');
    expect(title).toBeInTheDocument();
})