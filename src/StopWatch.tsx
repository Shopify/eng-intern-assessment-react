import React, {useState, useEffect} from 'react'

import App from './App'
import StopWatchButton from './StopWatchButton'

/** component that displays the stopwatch  */

type Props = {
    currentTime: Function[];
}

const StopWatch = (props: Props) => {
    const {currentTime} = props;

    return(
        <>
            <App />
        </>
    );
}

export default StopWatch;