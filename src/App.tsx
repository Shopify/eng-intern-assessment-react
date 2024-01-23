import React from 'react'
import StopWatch from "./StopWatch/StopWatch";
import styles from './styles.module.css'
export default function App() {
    return(
        <div className={styles.mainContainer}>
            <StopWatch/>
        </div>
    )
}