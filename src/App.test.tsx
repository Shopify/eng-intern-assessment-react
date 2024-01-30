import { render, screen } from '@testing-library/react';

import App from "./App";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import React from 'react';
import { Button } from '@chakra-ui/react';

test("test number", () => {
    render(<App />);
    const button = screen.getAllByRole("button");
    const label = screen.getAllByRole("heading");
    const svg = screen.getAllByRole("svg")
    expect(button.length).toBe(4);
    expect(label.length).toBe(2);
});

test("test content", () => {
    render(<App />);
    const button1 = screen.getAllByRole("button")[0];
    const button2 = screen.getAllByRole("button")[1];
    const button3 = screen.getAllByRole("button")[2];
    const button4 = screen.getAllByRole("button")[3];
    const heading1 = screen.getAllByRole("heading")[0];
    expect(button1.textContent).toBe("start");
    expect(button2.textContent).toBe("reset");
    expect(button3.textContent).toBe("stop");
    expect(button4.textContent).toBe("lap");
    expect(heading1.textContent).toBe("Shopify Challenge Stopwatch");
});



