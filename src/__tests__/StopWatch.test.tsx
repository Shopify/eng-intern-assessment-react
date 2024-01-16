/**
 * @jest-environment jsdom
 */

// added jest-environment jsdom to fix error: ReferenceError: window is not defined
// added jest-environment-jsdom

import React from "react";
import { render, screen, fireEvent, waitFor, act, prettyDOM } from "@testing-library/react";
import StopWatch from "../StopWatch";
import "@testing-library/jest-dom"

// tells Jest to use fake timers that don't actually wait
jest.useFakeTimers();

test("initial display should render 0s 00 with starting buttons", () => {
    render(<StopWatch />);

    // test main timer
    expect(screen.getByText("0s")).toBeInTheDocument();
    expect(screen.getByText("00")).toBeInTheDocument();

    // test buttons
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Lap")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();

    // lap timer and lap list should not be rendered
    expect(screen.queryByTestId("lap-timer")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).not.toBeInTheDocument();
});

test("start button should change to stop button when clicked and vice-versa", () => {
    render(<StopWatch />);

    // start button changes to stop button
    const startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
    })
    expect(screen.getByText("Stop")).toBeInTheDocument();

    // stop button changes to start button
    const stopButton = screen.getByText("Stop");
    act(() => {
        fireEvent.click(stopButton);
    })
    expect(screen.getByText("Start")).toBeInTheDocument();

});

test("main timer should start counting when start button is clicked and stop counting when stop button is clicked", async () => {
    const { container } = render(<StopWatch />);

    // click start button
    let startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(2000);
    });

    // timer should count to 2s 00 after 2 seconds
    await waitFor(() => {
        expect(screen.getByText("2s")).toBeInTheDocument();
    })

    // timer should count to 5s after 3 more seconds
    act(() => {
        jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
        expect(screen.getByText("5s")).toBeInTheDocument();
    })


    // click the stop button
    const stopButton = screen.getByText("Stop");
    expect(stopButton).toBeInTheDocument();
    act(() => {
        fireEvent.click(stopButton);
    })

    // timer should stop counting after stop button is clicked
    act(() => {
        jest.advanceTimersByTime(5000);
    });
    await waitFor(() => {
        expect(screen.getByText("5s")).toBeInTheDocument();
    })

    // timer should resume counting after start button is clicked
    startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(2000);
    });
    await waitFor(() => {
        expect(screen.getByText("7s")).toBeInTheDocument();
    })
})

test("main timer should reset to 0s 00 when reset button is clicked", async () => {
    const { container } = render(<StopWatch />);

    // click start button
    let startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(4000);
    });

    // timer should count to 4s after 4 seconds
    await waitFor(() => {
        expect(screen.getByText("4s")).toBeInTheDocument();
    })

    // click the stop button (reset button is disabled when timer is running)
    act(() => {
        fireEvent.click(screen.getByText("Stop"));
    })

    // click the reset button
    act(() => {
        fireEvent.click(screen.getByText("Reset"));
    })
    await waitFor(() => {
        expect(screen.getByText("0s")).toBeInTheDocument();
        expect(screen.getByText("00")).toBeInTheDocument();
    })

    // timer should resume counting after start button is clicked
    startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(2000);
    });
    await waitFor(() => {
        expect(screen.getByText("2s")).toBeInTheDocument();
    })
})

test("lap button should add a lap to the lap list when clicked", async () => {
    const { container } = render(<StopWatch />);

    // click start button
    const startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(2000);
    });

    // click lap button
    let lapButton = screen.getByText("Lap");
    act(() => {
        fireEvent.click(lapButton);
        jest.advanceTimersByTime(4000);
    });

    // lap list and timer should be rendered
    await waitFor(() => {
        expect(screen.getByTestId("lap-list")).toBeInTheDocument();
        expect(screen.getByTestId("lap-timer")).toBeInTheDocument();

        // lap list should have 1 element for title and 1 lap
        expect(screen.getByTestId("lap-list").childElementCount).toBe(2);

        // lap list should have a lap of 2s 00
        expect(screen.getByText("#1")).toBeInTheDocument();
        expect(screen.getByText("4s")).toBeInTheDocument();
    })

    act(() => {
        fireEvent.click(lapButton);
        jest.advanceTimersByTime(3000);
    })

    await waitFor(() => {
        // lap list should have 1 element for title and 2 laps
        expect(screen.getByTestId("lap-list").childElementCount).toBe(3);

        // lap list should have a lap with #2 as it's title and 3s as it's time
        expect(screen.getByText("#2")).toBeInTheDocument();
        expect(screen.getByText("3s")).toBeInTheDocument();
    })
})

test("lap timer should pause when stop button is clicked and resume when start button is clicked", async () => {
    const { container } = render(<StopWatch />);

    // click start button
    const startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(2000);
    });

    // click lap button
    let lapButton = screen.getByText("Lap");
    act(() => {
        fireEvent.click(lapButton);
        jest.advanceTimersByTime(4000);
    });

    // click on stop button
    act(() => {
        fireEvent.click(screen.getByText("Stop"));
    })

    // lap timer should pause
    await waitFor(() => {
        expect(screen.getByText("4s")).toBeInTheDocument();
    })

    // click on start button
    act(() => {
        fireEvent.click(screen.getByText("Start"));
        jest.advanceTimersByTime(2000);
    })

    // lap timer should resume
    await waitFor(() => {
        expect(screen.getByText("6s")).toBeInTheDocument();
    })
})

test("lap timer and list should be reset when reset button is clicked", async () => {
    const { container } = render(<StopWatch />);

    // click start button
    const startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(2000);
    });

    // click lap button
    let lapButton = screen.getByText("Lap");
    act(() => {
        fireEvent.click(lapButton);
        jest.advanceTimersByTime(4000);
    });

    // click on stop button
    act(() => {
        fireEvent.click(screen.getByText("Stop"));
    })

    // click reset button
    act(() => {
        fireEvent.click(screen.getByText("Reset"));
    })

    // lap list and timer should not be rendered
    await waitFor(() => {
        expect(screen.queryByTestId("lap-list")).not.toBeInTheDocument();
        expect(screen.queryByTestId("lap-timer")).not.toBeInTheDocument();
    })
})

// OTHER TESTS
test("lap button should be disabled when timer is not running but enabled when running", () => {
    render(<StopWatch />);

    // lap button should be disabled
    expect(screen.getByText("Lap")).toBeDisabled();

    // click start button
    const startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
    });

    // lap button should be enabled
    expect(screen.getByText("Lap")).toBeEnabled();
})

test("Reset button should be disabled when timer is running but enabled when not running", async () => {
    render(<StopWatch />);

    // click start button
    const startButton = screen.getByText("Start");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(2000);
    });

    // reset button should be disabled
    expect(screen.getByText("Reset")).toBeDisabled();

    // click stop button
    const stopButton = screen.getByText("Stop");
    act(() => {
        fireEvent.click(stopButton);
    });

    // reset button should be enabled
    await waitFor(() => {
        expect(screen.getByText("Reset")).toBeEnabled();
    })

})




