import React from "react";
import { act, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";


/******* HELPER FUNCTIONS *******/
function checkTime(container: HTMLElement, hours: string = "00", minutes: string = "00", 
                    seconds: string = "00", milliseconds: string = "00", equal: boolean = true) {
  /*
    Check if the timer is set to hours:minutes:seconds:milliseconds (if equal == True).
    Check if the timer is not set to hours:minutes:seconds:milliseconds (if equal == False).

    Parameters:
      container (HTMLElement): The container that holds the timer.
      hours (string): The expected number of hours.
      minutes (string): The expected number of minutes.
      seconds (string): The expected number of seconds.
      milliseconds (string): The expected number of milliseconds.

    Returns:
      None
  */
  if (equal) {
    expect(convertTimeToMilliseconds(hours + ":" + minutes + ":" + seconds + ":" + milliseconds)).toEqual(
      convertTimeToMilliseconds(returnTime(container).join(":")));
  } else{  
    expect(convertTimeToMilliseconds(hours + ":" + minutes + ":" + seconds + ":" + milliseconds)).toBeLessThan(
      convertTimeToMilliseconds(returnTime(container).join(":")));
  }
}

function convertTimeToMilliseconds(timeString: string) {
  /*
    Convert a string of the form "hours:minutes:seconds:milliseconds" to milliseconds.

    Parameters:
      timeString (string): The string to convert to milliseconds.
    
    Returns: 
      The number of milliseconds in the given time string.
  */

  // Split the string into [hours, minutes, seconds, milliseconds]
  const parts = timeString.split(":").map(Number);

  // Convert hours, minutes, seconds to milliseconds and add them up
  const hoursInMs = parts[0] * 60 * 60 * 1000;
  const minutesInMs = parts[1] * 60 * 1000;
  const secondsInMs = parts[2] * 1000;
  const milliseconds = parts[3];

  return hoursInMs + minutesInMs + secondsInMs + milliseconds;
}


function checkLapTime( container: HTMLElement, index: number) {
  /*
    Check if the lap table is rendered and if the lap time is correct.

    Parameters:
      container (HTMLElement): The container that holds the timer.
      lap (string): The expected lap number.
      time (string): The expected lap time.
      totalTime (string): The expected total time.
      index (number): The index of the current lap.

    Returns:
      None
  */

  expect(
    container.querySelector("#" + "Number-" + index.toString() + "-3")).toBeInTheDocument();
  expect(
    container.querySelector("#" + "Number-" + index.toString() + "-2")).toBeInTheDocument();
  expect(
    container.querySelector("#" + "Number-" + index.toString() + "-1")).toBeInTheDocument();
}


function returnTime(container: HTMLElement) {
  /*
    Return the time in the format hours:minutes:seconds:milliseconds.

    Parameters:
      hours (string): The number of hours.
      minutes (string): The number of minutes.
      seconds (string): The number of seconds.
      milliseconds (string): The number of milliseconds.

    Returns:
      The time in the format hours:minutes:seconds:milliseconds.
  */
  let finalList = [];
  finalList.push(container.querySelector("#hours").innerHTML);
  finalList.push(container.querySelector("#minutes").innerHTML);
  finalList.push(container.querySelector("#seconds").innerHTML);
  finalList.push(container.querySelector("#milliseconds").innerHTML);
  return finalList;
}

async function wait(ms: number) {
  /* 
    Wait for a certain number of milliseconds.

    Parameters:
      ms (number): The number of milliseconds to wait.

    Returns:
      None
  */
  return new Promise(resolve => setTimeout(resolve, ms));
}



/******* TEST CASES *******/
// TEST CASE 1
test("renders the App component", () => {
  const { container } = render(<App />);

  // Check if the initial timer is set to 00:00:00:00
  checkTime(container, "00", "00", "00", "00");

  // Check if all four buttons are rendered
  expect(screen.getByText("Start")).toBeInTheDocument();
  expect(container.querySelector(".bi-arrow-clockwise")).toBeInTheDocument();
  expect(screen.getByText("Lap")).toBeInTheDocument();
});



// TEST CASE 2
test("starts the stopwatch and checks if the time is updated after running", async () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  await act(async () => {
    startButton.click();
  });
  await wait(500);
  // The time should not be 00:00:00:00 anymore.
  checkTime(container, "00", "00", "00", "00", false); 
});


// TEST CASE 3
test("runs stopwatch, stops then runs again", async () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  await act(async () => {
    startButton.click();
  });

  await wait(200);

  // Check if the time is updated.
  let stopButton = screen.getByText("Stop");
  await act(async () => {
    stopButton.click();
  });

  let previoustime = returnTime(container);
  checkTime(container, "00", "00", "00", "00", false);

  // Start the stopwatch again, check if time updated.
  startButton = screen.getByText("Start");
  await act(async () => {
    startButton.click();
  });

  await wait(1000);
  checkTime(container, previoustime[0], previoustime[1], previoustime[2], previoustime[3], false);
});


// TEST CASE 4
test("start stopwatch, stop it, then reset", async () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  await act(async () => {
    startButton.click();
  });

  await wait(500);

  let stopButton = screen.getByText("Stop");
  await act(async () => {
    stopButton.click();
  });

  checkTime(container, "00", "00", "00", "20", false);

  // Reset the stopwatch
  let resetButton = container.querySelector(".bi-arrow-clockwise") as HTMLElement;
  await act(async () => {
    resetButton.click();
  });

  await wait(200);

  // Check if the initial timer is set to 00:00:00:00
  checkTime(container, "00", "00", "00", "00", true);
  });


// TEST CASE 5
test("Test lap button", async () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  await act(async () => {
    startButton.click();
  });

  await wait(1000);

  // Click the lap button
  let lapButton = screen.getByText("Lap");
  await act(async () => {
    lapButton.click();
  });
  
  // Check if the lap table is rendered
  expect(container.querySelector("#lap-table")).toBeInTheDocument();

  checkLapTime(container, 0);
});
  

// TEST CASE 6
test("Test lap button twice", async () => {
  const { container } = render(<App />);

  // Start the stopwatch
  let startButton = screen.getByText("Start");
  await act(async () => {
    startButton.click();
  });

  // Click the lap button
  let lapButton = screen.getByText("Lap");
  await act(async () => {
    lapButton.click();
  });

  // Check if the lap table is rendered
  expect(container.querySelector("#lap-table")).toBeInTheDocument();

  checkLapTime(container, 0);
  
  // Click the lap button again
  lapButton = screen.getByText("Lap");
  await act(async () => {
    lapButton.click();
  });

  // Check if the lap table is rendered
  expect(container.querySelector("#lap-table")).toBeInTheDocument();

    checkLapTime(container, 1);
});
 