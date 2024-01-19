import React, { useEffect, useState, useRef, useContext } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import StopWatchRecord from './StopWatchRecord'
import SWContext from './SWContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb} from '@fortawesome/free-solid-svg-icons'

import './styles/App.css'

export enum StopWatchStatus {
    Stoped, //0
    Running, //1
    Paused, //2
}

export default function App() {

    const {isDarkMode,setIsDarkMode} = useContext(SWContext)

    useEffect(() => {
        // toggle dark mode
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    },[isDarkMode])

    return(
        <div style={{height:"100%"}}>
            <button className='themeToggleBtn' onClick={()=>{setIsDarkMode(!isDarkMode)}}>
                <FontAwesomeIcon icon={faLightbulb}/>
            </button>
            <div className='view'>
                <div className='container'>
                    <StopWatch/>
                    <StopWatchButton/>
                    <StopWatchRecord/>
                </div>
            </div>
        </div>
            
    )
}