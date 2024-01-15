import React from "react";
import StopWatch from "./components/StopWatch";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <StopWatch />
    </div>
  );
}
