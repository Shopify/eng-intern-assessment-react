import * as React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("Stopwatch App", () => {
   it("renders App component", () => {
      render(<App />);

      screen.debug();
   });
});
