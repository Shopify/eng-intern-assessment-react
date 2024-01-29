import { render } from "@testing-library/react";
import StopWatch from "./StopWatch";

describe(StopWatch, ()=>{
    //individual test cases relating to stopwatch component
    it("displays correct time after 10 seconds", ()=> {
        const { getByTestId } = render(<StopWatch
            startHandler={()=>{}}
            stopHandler={()=>{}}
            lapHandler={()=>{}}
            resetHandler={()=>{}}
            timeToStringFormatter={()=>{return""}}
            lapsArray={[]}
            currentTime={0}
            isStartPressed={true}
            />); //render a mock version of the component and identify all props to pass in
            const timeDisplayValue = getByTestId("time-display").textContent; //store the value from the component to test
            setTimeout(()=>{
                console.log("running a test")
            }, 1000*10)
            expect(timeDisplayValue).toEqual("00:00:10")
    })
})