import {render, screen} from "@testing-library/react";
import React from "react";
import StopWatchButton from "../stopwatch-button/StopWatchButton";
import { userEvent } from "@testing-library/user-event";

test('Press a labelled button', async () => {
    // Setup
    let wasClicked = false;
    render(<StopWatchButton onClick={() => wasClicked = !wasClicked}>Test Button</StopWatchButton>);

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'Test Button'}))

    // Assert
    expect(wasClicked).toBeTruthy()
});
