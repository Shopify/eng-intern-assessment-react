import { fireEvent, getByTestId, render } from "@testing-library/react";
import StopWatch from "./Components/StopWatch";
import React from "react";
import userEvent from '@testing-library/user-event';
import { notEqual } from "assert";

describe(StopWatch, ()=>{

  //mock the string formatting function to test the time display
  function timeToStringMock( value : number){
      const hours = Math.trunc(value/(60*60))

      //calculate minutes
      const minutes = Math.trunc((value - hours*60*60)/60)

      //calculate seconds
      const seconds = Math.trunc(value - hours*60*60 - minutes*60)

      return (
          //format string to reflect time
          hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
          )
  }
    //individual test cases relating to stopwatch component
    it("displays 00:00:00 as start time", ()=> {
        const { getByTestId } = render(<StopWatch
            startHandler={()=>{}}
            stopHandler={()=>{}}
            lapHandler={()=>{}}
            resetHandler={()=>{}}
            timeToStringFormatter={timeToStringMock}
            lapsArray={[]}
            currentTime={0}
            isStartPressed={false}
            />); //render a mock version of the component and identify all props to pass in
            const timeDisplayValue = getByTestId("time-display").textContent; //store the value from the component to test
            expect(timeDisplayValue).toEqual("00:00:00")
    })

    it("displays 00:00:10 after 10 seconds", ()=> {
      const { getByTestId } = render(<StopWatch
          startHandler={()=>{}}
          stopHandler={()=>{}}
          lapHandler={()=>{}}
          resetHandler={()=>{}}
          timeToStringFormatter={timeToStringMock}
          lapsArray={[]}
          currentTime={0}
          isStartPressed={true}
          />); //render a mock version of the component and identify all props to pass in
          const timeDisplayValue = getByTestId("time-display").textContent; //store the value from the component to test
          setTimeout(()=>{
            expect(timeDisplayValue).toEqual("00:00:10")
          }, 1000*10)
          
    })

    it("displays a Lap as 00:00:10 after 10 seconds", ()=> {
      const { getByTestId } = render(<StopWatch
          startHandler={()=>{}}
          stopHandler={()=>{}}
          lapHandler={()=>{}}
          resetHandler={()=>{}}
          timeToStringFormatter={timeToStringMock}
          lapsArray={[10]}
          currentTime={0}
          isStartPressed={false}
          />); //render a mock version of the component and identify all props to pass in
          const lapDisplayValue = getByTestId("lap-display").textContent; //store the value from the component to test
          expect(lapDisplayValue).toEqual("Lap 1 : 00:00:10")
          
    })

    it("displays second Lap as 00:00:20 when Lap is pressed at 20 seconds and the first lap is already recorded", ()=> {
      const { container } = render(<StopWatch
          startHandler={()=>{}}
          stopHandler={()=>{}}
          lapHandler={()=>{}}
          resetHandler={()=>{}}
          timeToStringFormatter={timeToStringMock}
          lapsArray={[10]}
          currentTime={10}
          isStartPressed={true}
          />); //render a mock version of the component and identify all props to pass in
          const button = getByTestId(container, 'lap-reset-buttons').firstChild;

          setTimeout(()=>{
            fireEvent.click(button);
            const lapDisplayValue = getByTestId(container, "lap-display"); //store the value from the component to test
            expect(lapDisplayValue.children[1]).toEqual("Lap 2 : 00:00:20")    
          },10)        
                  
    })

    it("stops the timer when stop is pressed", ()=> {
      const { container } = render(<StopWatch
          startHandler={()=>{}}
          stopHandler={()=>{}}
          lapHandler={()=>{}}
          resetHandler={()=>{}}
          timeToStringFormatter={timeToStringMock}
          lapsArray={[]}
          currentTime={10}
          isStartPressed={true}
          />); //render a mock version of the component and identify all props to pass in
          const button = getByTestId(container, 'start-stop-buttons').children[1]; 
          fireEvent.click(button); //press stop button at 10 seconds
          const timeDisplayValueInitial = getByTestId(container, "time-display").textContent;//store timer value 


          setTimeout(()=>{
            const timeDisplayValue = getByTestId(container, "time-display").textContent; 
            expect(timeDisplayValue).toEqual(timeDisplayValueInitial)//10 seconds after pressing stop the time should be the same it was 10 seconds ago     
          },10)        
                  
    })

    it("starts the timer when start is pressed", ()=> {
      const { container } = render(<StopWatch
          startHandler={()=>{}}
          stopHandler={()=>{}}
          lapHandler={()=>{}}
          resetHandler={()=>{}}
          timeToStringFormatter={timeToStringMock}
          lapsArray={[]}
          currentTime={0}
          isStartPressed={false}
          />); //render a mock version of the component and identify all props to pass in
          const button = getByTestId(container, 'start-stop-buttons').children[0]; 
          fireEvent.click(button); //press start button

          setTimeout(()=>{
            const timeDisplayValue = getByTestId(container, "time-display").textContent; 
            expect(timeDisplayValue).toEqual("00:00:10")//10 seconds after pressing start the time should be 00:00:10  
          },10)        
                  
    })

    it("should clear the timer when reset is pressed", ()=> {
      const { container } = render(<StopWatch
          startHandler={()=>{}}
          stopHandler={()=>{}}
          lapHandler={()=>{}}
          resetHandler={()=>{}}
          timeToStringFormatter={timeToStringMock}
          lapsArray={[]}
          currentTime={100}
          isStartPressed={false}
          />); //render a mock version of the component and identify all props to pass in
          const button = getByTestId(container, 'lap-reset-buttons').children[1]; 
          fireEvent.click(button); //press reset button

          setTimeout(()=>{
            const timeDisplayValue = getByTestId(container, "time-display").textContent; 
            expect(timeDisplayValue).toEqual("00:00:00")//the time value should be reset to 00:00:00    
          },10)        
    })

    it("should clear the laps when reset is pressed", ()=> {
      const { container } = render(<StopWatch
          startHandler={()=>{}}
          stopHandler={()=>{}}
          lapHandler={()=>{}}
          resetHandler={()=>{}}
          timeToStringFormatter={timeToStringMock}
          lapsArray={[]}
          currentTime={100}
          isStartPressed={false}
          />); //render a mock version of the component and identify all props to pass in
          const button = getByTestId(container, 'lap-reset-buttons').children[1]; 
          fireEvent.click(button); //press reset button

          setTimeout(()=>{
            const lapDisplayValue = getByTestId(container, "lap-display"); 
            expect(lapDisplayValue).toEqual(null) //there should be no laps stored or displayed
          },10)        
    })
})