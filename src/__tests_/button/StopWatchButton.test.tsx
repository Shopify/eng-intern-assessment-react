import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

import StopWatchButton from "../../component/common/button/StopWatchButton";

/**
 * Sample button cases
 */
const buttonCases = [
  {
    btnType: { label: "Start", isActive: true },
    onButtonClick: () => {},
    className: "Start",
    name: "Start",
  },
  {
    btnType: { label: "Stop", isActive: true },
    onButtonClick: () => {},
    className: "Stop",
    name: "Stop",
  },
  {
    btnType: { label: "Lap", isActive: true },
    onButtonClick: () => {},
    className: "Lap",
    name: "Lap",
  },
  {
    btnType: { label: "Reset", isActive: true },
    onButtonClick: () => {},
    className: "Reset",
    name: "Reset",
  },
];

//Loop through buttons
buttonCases.forEach((btn) => {
  test("renders stopwatch button", async () => {
    //Arrange StopWatchButton component
    render(
      <StopWatchButton
        btnType={btn.btnType}
        onButtonClick={btn.onButtonClick}
        className={btn.className}
        name={btn.name}
      />
    );

    //Act and Assert to check button name to be in the documnent
    expect(screen.getByText(btn.name)).toBeInTheDocument();
  });
});
