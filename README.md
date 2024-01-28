# Stopify | Shopify Stopwatch

## Demo

https://github.com/clairep94/eng-intern-assessment-react/assets/128436909/49437b5e-d841-46de-a45f-dfdf6f05c4bc

## About
This is the Shopify Summer Intern 2024 (Frontend) React Assessment by Claire Peng

## Features
Adds test-driven Stopwatch that can:
- Start counting when the user clicks the start button.
- Stop counting when the user clicks the stop button.
- Record and display laps when the user clicks the lap button.
  - Each lap shows the Lap Number and the time elapsed from the previous lap
- Reset to zero and clear laps when the user clicks the reset button.

All changes were made in alignment to the project structure as described in the original brief:
- `src/App.tsx`: The main component that renders the stopwatch and handles its functionality.
- `src/Stopwatch.tsx`: A separate component that represents the stopwatch display.
- `src/StopwatchButton.tsx`: A separate component that represents the start, stop, and reset buttons.

All styling decisions were chosen to align with Shopify's current UI:
- Background colours are Shopify Green (#96BF48) and an lighter version of Polaris Purple (#5b5b85)
- Buttons are pill-shaped. Primary buttons have black fill with white text. Secondary buttons have white or black borders with matching text.
- Lap List has a matching border style to the black secondary button.

  
## Testing
<img width="308" alt="Screenshot 2024-01-27 at 21 34 25" src="https://github.com/clairep94/eng-intern-assessment-react/assets/128436909/9a93cf00-5935-4786-a051-feeedb30c1ff">

- Unit testing for `StopWatch.tsx` & `StopWatchButtons.tsx`
- Integration testing for `App.tsx`


## Additional Dependencies Introduced
- `@TailwindCSS` and `@postCSS` for styling UI components
    - Adds corresponding config files (`tailwind.config.js` and `postcss.config.js`) 
- `@testing-library/jest-dom` and `jest-environment-jsdom` for testing


## Installation, Running the App & Running Tests
In the root folder:
1. `npm install` to install dependencies
2. `npm start` to run the app
3. `npm test` to run tests
