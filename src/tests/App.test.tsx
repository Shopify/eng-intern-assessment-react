import React from 'react'
import {render, screen} from '@testing-library/react'
import App from '../App'

test('Stopwatch renders correctly', async() => {
    render(<App/>)
    const linkElement = screen.getByText(/stopwatch/i);
    expect(linkElement).toBeDefined();
})