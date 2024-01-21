import React from "react";
import StopWatch from "./StopWatch";

export default function App() {
    return (
        <div className="flex flex-col gap-10 text-center">
            <h1 className="pt-48 text-7xl">Stopwatch</h1>
            <StopWatch />
        </div>
    );
}
