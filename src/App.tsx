import React from "react";
import { THEME } from "./constants";

export default function App() {
  return (
    <div
      style={{
        backgroundColor: THEME[0],
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
}
