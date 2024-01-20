import React from 'react'
import { render, fireEvent, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from "../StopWatch";

/*
    @Test 1.1: Test ensures that initial values of the stopwatch are set to 00:00:00. 
    Implementation: Each values of the watch, `hour`, `minutes`, and `seconds` are stored into a constant, and checked if they are equal to `00`. 
*/
test("Stopwatch should have initial value of 00:00:00", () => {
    const {getByTestId} = render(<StopWatch/>)
    const checkHourValue = getByTestId("watch-hour").textContent;
    const checkMinValue = getByTestId("watch-min").textContent;
    const checkSecValue = getByTestId("watch-sec").textContent;
    expect(checkHourValue).toBe('00');
    expect(checkMinValue).toBe('00');
    expect(checkSecValue).toBe('00');
})

/*
    @Test 1.2: Test ensures that Laps does not exist initially. 
    Implementation: Since no laps exist initally, we are displaying a label to the user indicating that no laps exist. Store this value into a constant, and if this value is not empty, that means the user can indeed see this text, ensuring that laps do not exist.
*/
test("Laps should be initally empty and should indicate it", () => {
    const {getByTestId} = render(<StopWatch />)
    const timeLapsValue = getByTestId('laps-empty-indication').textContent;
    expect(timeLapsValue).not.toBe("")
})

/*
    @Test 1.3: Test ensures that start button works as expected. 
    Implementation: Store the start button into a constant and use the fireEvent() method to click the button. Get the initial value of the `second`. Wait for 2 seconds using the await act() function. Get the final value of the `second`. Check for the two values to not be equal.
    Note: This should be an async function as we are waiting for the values to change
    Note: Start button is also used as the pause button
*/
test("Stopwatch should start when start button is pressed", async() => {
    const {getByTestId} = render(<StopWatch />)
    const initialSec = getByTestId("watch-sec").textContent;
    expect(initialSec).toBe('00');

    const startPauseBtn = getByTestId("start-pause-btn");
    await act(async () => {
        fireEvent.click(startPauseBtn);
        await new Promise(r => setTimeout(r, 2000));
    })

    const updatedSec = getByTestId("watch-sec").textContent;
    expect(updatedSec).not.toBe(initialSec);

})

/*
    @Test 1.4: Test ensures that pause button works as expected. 
    Implementation: Extends from @Test 1.3. We use a for loop as we have a repeated block of code. Once we click the start and pause button twice, and store the initial and final values of `second`. We check for these values to be the same. 
    Note: This should be an async function
*/
test("Stopwatch should stop when pause button is pressed", async() => {
    const {getByTestId} = render(<StopWatch />)
    const startPauseBtn = getByTestId("start-pause-btn");
    for (let i=0; i < 2; i++) {
        await act(async () => {
            fireEvent.click(startPauseBtn);
            await new Promise(r => setTimeout(r, 1000));
        })
    }
    const initallyPausedAt = getByTestId("watch-sec").textContent;

    await act(async () => {
        await new Promise(r => setTimeout(r, 2000));
    })

    const finallyPausedAt = getByTestId("watch-sec").textContent;
    expect(initallyPausedAt).toBe(finallyPausedAt);

})

/*
    @Test 1.5: Test ensures that reset button works as expected. 
    Implementation: Similar to @Test 1.3. We press the start button using fireEvent() and await for 2 seconds. We store the inital and intermediate values of `second`. We check for the intial and intermediate values to be different. Once the reset button is clicked, we check the final value to be `00`, which should be also different than the intermediate value.
    Note: This should be an async function
*/
test("Stopwatch should be reset to 00:00:00 when reset is clicked", async() => {
    const {getByTestId} = render(<StopWatch />)
    const initalTime = getByTestId("watch-sec").textContent;

    const startPauseBtn = getByTestId("start-pause-btn");
    await act(async () => {
        fireEvent.click(startPauseBtn);
        await new Promise(r => setTimeout(r, 2000));
    })

    const intermediateTime = getByTestId("watch-sec").textContent;
    expect(intermediateTime).not.toBe(initalTime)

    const resetBtn = getByTestId("reset-btn");
    fireEvent.click(resetBtn)

    const finalTime = getByTestId("watch-sec").textContent;
    expect(intermediateTime).not.toBe(finalTime);
    expect(finalTime).toBe(`00`);

})

/*
    @Test 1.6: Test ensures that lap button works as expected. 
    Implementation: Store the lap button and start button into a constant. Once start button is clicked, we await for 2 seconds for the stopwatch to change values. We then click on the lap button and store the lap value into a constant. Similarly, save the original value that is stored on te stopwatch. We expect these two values to be the same. 
    Note: This should be an async function
*/
test("Stopwatch should record each lap when its clicked", async() => {
    const { getByTestId } = render(<StopWatch />);
    const startPauseBtn = getByTestId("start-pause-btn");
    const lapBtn = getByTestId("lap-btn");

    fireEvent.click(startPauseBtn)
    await act(async () => {
        await new Promise(r => setTimeout(r, 2000));
    })
    fireEvent.click(startPauseBtn)
    fireEvent.click(lapBtn)

    const originalTime = getByTestId("watch-sec").textContent
    let lap = screen.getAllByTestId(/^element-\d+$/);
    expect(lap).toHaveLength(1);
    lap = lap[0].innerHTML.split(":")[3]
    expect(lap).toBe(originalTime);
    
})

/*
    @Test 1.7: Test ensures that lap button can record multiple laps. 
    Implementation: Extends from @Test 1.6. We use a for loop as we have repeated code. We perform the previous test 4 times using a for loop. 
    Note: This should be an async function
*/
test("Stopwatch should be able to record multiple laps", async() => {
    const { getByTestId } = render(<StopWatch />);
    const startPauseBtn = getByTestId("start-pause-btn");
    const lapBtn = getByTestId("lap-btn");

    fireEvent.click(startPauseBtn)
    for (let i=0; i < 4; i++) {
        await act(async () => {
            await new Promise(r => setTimeout(r, 1000));
        })
        fireEvent.click(lapBtn)

        const originalTime = getByTestId("watch-sec").textContent
        let lap = screen.getAllByTestId(/^element-\d+$/);
        expect(lap).toHaveLength(i+1);
        lap = lap[i].innerHTML.split(":")[3]
        expect(lap).toBe(originalTime);
    }
    
})

/*
    @Test 1.8: Test ensures that reset button removes all laps. 
    Implementation: Similiar to @test 1.7 and @test 1.6. Once we record several laps, we click on the reset button. We check that the values of the stopwatch are set to 00:00:00 and that laps are resetted by checking the indication message as @test 1.2
    Note: This should be an async function
*/
test("Stopwatch and Laps should be set to default values when clicked on reset", async() => {
    const { getByTestId } = render(<StopWatch />);
    const startPauseBtn = getByTestId("start-pause-btn");
    const lapBtn = getByTestId("lap-btn");
    const resetBtn = getByTestId("reset-btn")

    fireEvent.click(startPauseBtn)
    for (let i=0; i < 3; i++) {
        await act(async () => {
            await new Promise(r => setTimeout(r, 1000));
        })
        fireEvent.click(lapBtn)
    }

    let lap = screen.getAllByTestId(/^element-\d+$/);
    expect(lap).toHaveLength(3);
    
    fireEvent.click(resetBtn)
    const timeLapsValue = getByTestId('laps-empty-indication').textContent;
    expect(timeLapsValue).not.toBe("")

    const checkHourValue = getByTestId("watch-hour").textContent;
    const checkMinValue = getByTestId("watch-min").textContent;
    const checkSecValue = getByTestId("watch-sec").textContent;
    expect(checkHourValue).toBe('00');
    expect(checkMinValue).toBe('00');
    expect(checkSecValue).toBe('00');
})
    
/*
    @Test 2.1 [Edge Case]: Test ensures that a cannot be recorded if the stopwatch has not started
    Implementation: We simply store the lap button in a constant and try clicking the button. We check that no laps has been recorded by checking the indication message as described in @test 1.2.
*/
test("Stopwatch should not record a lap before starting", () => {
    const { getByTestId } = render(<StopWatch />)
    const lapBtn = getByTestId("lap-btn")

    let timeLapsValue = getByTestId('laps-empty-indication').textContent;
    expect(timeLapsValue).not.toBe("")

    fireEvent.click(lapBtn)

    timeLapsValue = getByTestId('laps-empty-indication').textContent;
    expect(timeLapsValue).not.toBe("")
})

/*
    @Test 2.2 [Edge Case]: Test ensures that the same lap cannot be recorded twice
    Implementation: Similar to the previous test cases, We store the start and lap button into a constant. Once we pause the stopwatch (after we have started it), we try clicking the lap button twice, and we check that only 1 lap has been recorded. 
    Note: This is an async function
*/
test("Stopwatch should not record a duplicate lap", async() => {
    const { getByTestId } = render(<StopWatch />)
    const lapBtn = getByTestId("lap-btn")
    const startPauseBtn = getByTestId("start-pause-btn")

    let timeLapsValue = getByTestId('laps-empty-indication').textContent;
    expect(timeLapsValue).not.toBe("")

    fireEvent.click(startPauseBtn)
    await act(async () => {
        await new Promise(r => setTimeout(r, 2000));
    })
    fireEvent.click(startPauseBtn)
    fireEvent.click(lapBtn)
    let lap = screen.getAllByTestId(/^element-\d+$/);
    expect(lap).toHaveLength(1);

    fireEvent.click(lapBtn)
    lap = screen.getAllByTestId(/^element-\d+$/);
    expect(lap).toHaveLength(1);
})
