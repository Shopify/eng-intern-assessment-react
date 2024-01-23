# Notes

I had some issues configuring React Testing Library and Jest in this project, but I eventually managed to get it working. I had to make a modification to `package.json` file, by adding `"testEnvironment": "jsdom"` to the `jest` section. Additionally, I had to install a few other dependencies to get everything to work, I hope that's acceptable.

`App.tsx` contains all the states and the functions to handle buttons. `StopWatchButton.tsx` contains the actual rendering of the buttons. `StopWatch.tsx` contains the rendering of the stopwatch and the lap counter/timer.

The tests are located in the `__tests__` folder. I kept all the tests in one file, just to keep things simple. Tests can be run in the parent directory, using `npm test`.
