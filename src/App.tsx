import React from "react";
import StopWatch from "./components/StopWatch";
import "./styles/globals.css";

export default function App() {
  return (
    <>
      <StopWatch />
      <footer>
        Made with <span className="heart">❤</span> by{" "}
        <a href="https://vanshsood.com">Vansh Sood</a> for{" "}
        <a href="https://shopify.com">Shopify</a>.
      </footer>
    </>
  );
}
