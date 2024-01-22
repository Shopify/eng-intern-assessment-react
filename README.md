[![Component Demo](https://img.youtube.com/vi/SpiKz3W5t68/0.jpg)](https://youtu.be/SpiKz3W5t68)


# Component Documention 

## StopWatch Component
### Overview
The StopWatch component is a customizable stopwatch UI component. It provides a context for stopwatch-related data and allows for the inclusion of child components that can use this context.

### Props
The StopWatch component accepts the following props:

sw (optional): An object of type stopWatch that represents the stopwatch's state. If not provided, a default stopwatch state will be created using the useStopWatch hook.

darkTheme (optional): A boolean that determines whether the stopwatch should use a dark theme. Defaults to true.

containerStyles (optional): An object that defines custom styles for the stopwatch container.

children: ReactNode elements that will be rendered inside the stopwatch container.

### Usage
The StopWatch component is used by wrapping it around the child components that need access to the stopwatch context. The StopWatchContext.Provider component provides the stopwatch context to these child components, and optionally passing the return of useStopWatch hook to the sw prop.

This would allow you to access the timer functionality and callbacks from outside the StopWatch component.

```jsx
const stopWatchController = useStopWatch({});
<StopWatch sw={stopWatchController} darkTheme={true} containerStyles={myStyles}>
    <DigitalDisplay />
    <AnalogDisplay />
    <LapDisplay />
</StopWatch>
```

## useStopWatch Hook

### Overview

`useStopWatch` is a custom React hook that provides stopwatch functionality. It returns an object containing the stopwatch state and relevant callbacks.

### Parameters

- `resolutions` (optional): An array of `Resolution` objects that define how time is divided and displayed. Defaults to hours, minutes, seconds, and centiseconds.
    - example: 
    ```typescript
        export interface Resolution {
            divisor: number;
            modulus: number;
        }

        const myResolutions: Resolution[] = [
            { divisor: 1000, modulus: 60 }, // seconds
            { divisor: 60, modulus: 60 }, // minutes
            { divisor: 60, modulus: 24 }, // hours
            { divisor: 24, modulus: 100 }, // centiseconds
        ];
        
    ```
    when displaying time, milliseconds are divided by the divisor floored, and the modulus is applied to the result.


### Return Value

An object of type `StopWatchController` with the following properties:

- `milliseconds`: The total elapsed time in milliseconds.
- `resolutions`: The array of `Resolution` objects passed as a parameter.
- `laps`: An array of lap times in milliseconds.
- `running`: A boolean indicating whether the stopwatch is currently running.
- `actions`: An object containing the following functions:
  - `start`: Starts the stopwatch.
  - `stop`: Stops the stopwatch.
  - `reset`: Resets the stopwatch and clears all lap times.
  - `lap`: Records the current time as a lap time.

### Usage

```typescript
const { milliseconds, resolutions, laps, running, actions } = useStopWatch({ resolutions: myResolutions });
```


## DigitalDisplay Component

### Overview

The `DigitalDisplay` component is a React component that displays the time of a stopwatch or a lap in a digital format.

### Props

The `DigitalDisplay` component accepts the following props:

- `isLap` (optional): A boolean that determines whether the display is for a lap time. Defaults to `false`.

- `containerStyles` (optional): An object that defines custom styles for the display container.

- `digitStyles` (optional): An object that defines custom styles for the digits.

- `milliseconds` (optional): The time to display in milliseconds. If not provided, the time from the `StopWatchContext` will be used.

- `resolutions` (optional): An array of `Resolution` objects that define how time is divided and displayed. If not provided, the resolutions from the `StopWatchContext` will be used.

- `darkTheme` (optional): A boolean that determines whether the display should use a dark theme. If not provided, the theme from the `StopWatchContext` will be used.

### Usage

```tsx

<DigitalDisplay isLap={true} containerStyles={myContainerStyles} digitStyles={myDigitStyles} milliseconds={myMilliseconds} resolutions={myResolutions} darkTheme={true} />

```
manual passing of all props 

```tsx

<DigitalDisplay />

```
using the context to pass props, must be wrapped in StopWatch component





## AnalogDisplay Component

### Overview

The `AnalogDisplay` component is a React component that displays the time of a stopwatch or a lap in an analog format.

### Props

The `AnalogDisplay` component accepts the following props:

- `containerStyles` (optional): An object that defines custom styles for the display container.

- `backgroundImage` (optional): A string that sets the background image of the display.

- `clockStyle` (optional): An object that defines custom styles for the clock.

- `secondTicks` (optional): A boolean that determines whether the display should show second ticks. Defaults to `true`.

- `borderColor` (optional): A string that sets the border color of the display. Defaults to `#343232`.

- `styles` (optional): An object that defines custom styles for the display.

- `faceColor` (optional): A string that sets the color of the clock face.

- `complication` (optional): A boolean that determines whether the display should show a complication. Defaults to `true`.

- `ComplicationProps` (optional): An object that defines the properties for the Complication component.

- `clockSize` (optional): A number that sets the size of the clock. Defaults to `300`.

- `borderWidth` (optional): A number that sets the width of the border. Defaults to `12`.

- `borderRadius` (optional): A string that sets the border radius of the display. Defaults to `100%`.

- `milliseconds` (optional): The time to display in milliseconds. If not provided, the time from the `StopWatchContext` will be used.

- `laps` (optional): An array of lap times in milliseconds. If not provided, the lap times from the `StopWatchContext` will be used.

- `darkTheme` (optional): A boolean that determines whether the display should use a dark theme. If not provided, the theme from the `StopWatchContext` will be used.

### Usage

```tsx
    <StopWatch>
        <AnalogDisplay 
            backgroundImage={analogBackgroundImage}
            clockSize={analogSize}
            ComplicationProps={
                {
                    clockSize: complicationSize,
                }
            }
        />
    </StopWatch>
```

In this example, `myContainerStyles`, `myBackgroundImage`, `myClockStyle`, `myStyles`, and `myComplicationProps` are objects that define custom styles for the display container, the background image, the clock, the display, and the Complication component respectively, `true` sets the display to show second ticks and to use a dark theme, `#343232` and `#ffffff` set the border color and the face color respectively, `myComplication` is a string that sets the complication, `300` and `12` set the clock size and the border width respectively, `100%` sets the border radius, `myMilliseconds` is the time to display in milliseconds, and `myLaps` is an array of lap times in milliseconds.



## StopWatchButton Component

### Overview

The `StopWatchButton` component is a React component that represents a button in a stopwatch UI. It can be used to start, stop, reset, or record a lap time.

### Props

The `StopWatchButton` component accepts the following props:

- `type`: A string that determines the type of the button. It can be 'Start', 'Stop', 'Reset', or 'Lap'.

- `action`: A function that is called when the button is clicked.

- `children` (optional): ReactNode elements that will be rendered inside the button.

- `darkTheme` (optional): A boolean that determines whether the button should use a dark theme. Defaults to `false`.

- `styles` (optional): An object that defines custom styles for the button.

- `testId` (optional): A string that sets the `data-testid` attribute of the button for testing purposes.

- `disabled` (optional): A boolean that determines whether the button should be disabled. Defaults to `false`.

- `textStyles` (optional): An object that defines custom styles for the text inside the button.

### Usage

```tsx
    <StopWatchButton 
        type='Start' 
        action={callback} 
        styles={myStyles} 
        testId='myTestId' 
    >
    {myChildren}
</StopWatchButton>
```

In this example, 'Start' sets the type of the button, `callback` is a function that is called when the button is clicked, `true` sets the button to use a dark theme, `myStyles` and `myTextStyles` are objects that define custom styles for the button and the text inside the button respectively, 'myTestId' sets the `data-testid` attribute of the button for testing purposes, `false` sets the button to be enabled, and `myChildren` are ReactNode elements that will be rendered inside the button.



## StopWatchButtonGroup Component

### Overview

The `StopWatchButtonGroup` component is a React component that groups together the buttons of a stopwatch UI. It includes a start/stop button, a reset button, and a lap button.

### Props

The `StopWatchButtonGroup` component accepts the following props:

- `startButtonStyles` (optional): An object that defines custom styles for the start button.

- `stopButtonStyles` (optional): An object that defines custom styles for the stop button.

- `resetButtonStyles` (optional): An object that defines custom styles for the reset button.

- `lapButtonStyles` (optional): An object that defines custom styles for the lap button.

- `containerStyles` (optional): An object that defines custom styles for the button group container.

- `darkTheme` (optional): A boolean that determines whether the button group should use a dark theme. If not provided, the theme from the `StopWatchContext` will be used.

- `running` (optional): A boolean indicating whether the stopwatch is currently running. If not provided, the running state from the `StopWatchContext` will be used.

- `actions` (optional): An object containing the functions to start, stop, reset, and record lap times. If not provided, the actions from the `StopWatchContext` will be used.

### Usage

```tsx
    <StopWatch darkTheme={darkMode}>
        <StopWatchButtonGroup />
    </StopWatch>
```
Using context from StopWatch Wrapper


```tsx

<StopWatchButtonGroup startButtonStyles={startstyling} stopButtonStyles={stopStyling} resetButtonStyles={resetstyling} lapButtonStyles={myLapButtonStyles} containerStyles={myContainerStyles} darkTheme={true} running={stateVar} actions={actionCallBacks} 
/>

```



--- 

<br/>

<br/>

<br/>

<br/>

# Approach
Building a stopwatch component was pretty straight forwards so I approached this technical challenge as if I were contributing to a component library, so my design decisions based on the idea that I'm not the consumer of the component. I've recently started contributing to a few open source react libraries and did my best to follow the general structure of those larger scale projects without changing any of the tooling present in this repo.

I also wanted this to be as light weight as possible so I avoided adding any dependancies plus I feel that would also defeat the purpose of the exercise. This submission is enitrely vanilla React. 

I'm a huge fan of open source libraries like ShadCn, and recently started looking into Polaris, and I appreciate the batteries included but optional approach they take. Nice default styling, but give devs granular control over composition of components and styling each child element, and tried to apply what I've learned by digging through those libraries. 

# Design Decisions 
### Timer Functionality, Animation & Analog Clock
My immediate thought was to use setInterval with a callback that changes a state variable and get the time delta between the last new Date object and the one after the callback was triggered, along with a useEffect, however I do not believe this is a good appraoch for the application of a stopwatch. For one, the interval is not guaranteed to be called at the same interval every time, second, because of the nature of the JS event loop, and that intervals/timers are macro tasks, the interval callback will not be called until the call stack is empty and the next interation of the loop. 

I remembered that JS has excellent granular control over animation frames via the requestAnimationFrame API and performane.now() which is not only a vastly superior timing mechanism for high interval callbacks, the use of recursive callbacks with requestAnimationFrame, and timestamping with performance.now() made me want to use richer animations in this component so I added an analog clock with an animated second hand and complication with animated 10th of a second hand to demonstrate the use of requestAnimationFrame and performance.now().

The Animation was suprisingly easy, some basic modulo math along with leveraging CSS translations and ability to pass styles inline made this almost trivial when its by far the most visually impressive part of the component, any by combining the use of requestAnimationFrame and performance.now() I was able to get a very smooth animation limited only by the refresh rate of the monitor, while mainting a high level of accuracy in the time displayed.

### useStopWatch Hook
Extracting the logic into a hook was the obvious choice here, and I wanted to demonstrate the use of a custom hook. 
I attempted to optimize a reasonable amount by wrapping the start, stop, reset and lap functions in useCallback. There were a few other optimizations I could have made, I feel like useMemo for instance could have been used here, but this component heirarchy is a couple layers and we're passing style props down to the children, and I remember that useMemo has an infamous foot gun with passing dynamic style props to children. Given some time and a little more research I could have probably optimized this a lot more. 

### StopWatch Component as 

### resolution[] array
So I got a litttle clever here I think, I wanted to demonstrate the flexibility of the component, the implementation with resolution array allows the consumer to pass in an array of resolution objects {modulo:number, divisor:number}
each of these objects contain the modulo and divisor needed to convert milliseconds into the desired time resolution.
ie divisor=1000, modulo=60 would convert milliseconds into seconds. This implementation allows the consumer to dynamically change the resolution of the stopwatch, and even add new resolutions.

### In Line Styles
All of my personal development projects use some form of inline styling, and this method is what allows me to move fastest. I absolutely love tailwind and functional approach to styling and it's become a very hard pattern to break. Furthermore it's easier for me to reason about the interaction between the CSS of components when I see exactly whats applied to each element. 
I may be mistaken, but considering I approached this as if it were a component in a larger library I feel like each new style sheet is another gun pointed at my foot. I think it's best to leave the styling up to the consumer of the component with a batteries included but optional approach. 

All that being said it drastically increased the development time of this component. If there was a provided style sheet which implied that was the standard styling for a component in this hypothetical library, I probably would have drastically reduced the amount of inline styles present. 

### Hooks to combine default styles with consumer styles
Im pretty sure this is a bad idea, and is not best practice, but without setting up a postcss pipeline or setting up tailwind this is the best way I could think of to combine default styles with consumer styles. I'm not sure if this is a good idea, but it works.

### StyleForm.tsx
This was just a little addon to demonstrate some of the modular styling and composition capabilities of this component.

# What I don't like about my approach
#### partially realized inline style implementation
I committed to inline styles, but left the job unfinished, the purpose of the inline style implementation would be to provide a set of guardrails to the consumer to ensure that the component is styled in a way that doesn't break anything, but most of the time I got lazy and just allow the consumer to pass in raw styles rather than thinking about what styles should be exposed.

#### resolution array
I also don't really know where the resolution array should live. I feel like the useStopWatch hook is already doing a lot, and I don't want to add any more complexity to it but it also feels like the logic place. 

#### feature creep
I got a little too excited and added more features than was necessary and drastically increased my development time. The analog clock was just too cool to pass up but I failed to consider the time spent messing with css and unit testing. 

#### Incomplete Testing
I didn't really have a formal plan for testing. Given more time I would have liked to have created a proper equivelance partition table, and a more robust test suite to ensure not just code coverage but case coverage.


# Disclosures 
I did *almost* everything by myself. There were a few things I really needed to research. 
- The recursive use of requestAnimationFrame and performance.now() was the result of a decent amount of reading and research.

The following I did to resort to ripping off stack overflow with only minor adjustments: 
- using a repeating-conical-gradient along with a mask to create the second markers on the analog clock
- changing the point of rotation of the second hand on the analog clock. Unfortunately I'm not quite a CSS god yet. 



# If I owned this library what would I do differently?
#### Tailwind 
My love always and forever, themeing is a blessing, library wide consistant layout, inline meadia queries and breakpoints. 
Theres so many things that I missed from tailwind while working on this project.


#### Open Source UI Libraries 
Im a huge fan of ReactAria, ShadCn, RadixUI and NextUI. They all offer a set of beautiful and fully accessible components that are all interoperable with each other and tailwind theming. Once again I feel like bringing in external libraries defeats the purpose of the exercise. 


# What I learned 
- Designing a consistant Typing and styling system for a component library is hard. Very hard. 
- I learned a ton. Theres a lot of functionality where I would have just reached for a libary or a statemanagement solution but reasoning from first principles and building it myself was a great learning experience.
- I did a deepdive into performance.now() and requestAnimationFrame API. Dynamic manipution of inline styles for animations. 
- I gained a massive appreciation for the work open source UI maintainers do when they have to create a consistent and extensible API for their components along with types and documentation for everything. Its easy to build with components, but building components for others to use is wild. 


# Other Projects
- Get Active: Full stack, multi-tenant event management and ticketing platform.
    - Live Demo: https://getaktive.vercel.app 
    -   write up with video demos here: https://www.linkedin.com/posts/connorbeleznay_get-active-demo-activity-7153447848913567744-lyjP?utm_source=share&utm_medium=member_desktop



