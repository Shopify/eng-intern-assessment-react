import React from 'react';
import { render } from "@testing-library/react";
import App from "../App";
import StopWatch from '../components/StopWatch';

describe(App, () => {

  it("App renders the Stop Watch component",() => {
    render(<App/>);
    expect(<StopWatch isTimeRunning={false} setIsTimeRunning={()=>{}}/>); //Other option, set the data-testId of the actual component and expect screen.getByTestId(the id)
  });

});