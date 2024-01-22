import React, { useEffect, useContext } from 'react'
import StopWatch from "./StopWatch"
import StopWatchButton from './StopWatchButton'
import StopWatchRecord from './StopWatchRecord'
import SWContext from './SWContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb} from '@fortawesome/free-solid-svg-icons'

import './styles/App.css'

export enum StopWatchStatus {
    Stoped, //0
    Running, //1
    Paused, //2
}

export default function App() {

    const {isDarkMode,setIsDarkMode} = useContext(SWContext)

    // listen on user deault color scheme
    useEffect(() => {
        
        const listener = (e?: MediaQueryListEvent) => {
            if(e){
                const newColorScheme = e.matches ? "dark" : "light"
                setIsDarkMode(newColorScheme=="dark")
            }
        }
        
        // Run once on load
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const newColorScheme = darkModeMediaQuery.matches ? "dark" : "light"
        setIsDarkMode(newColorScheme=="dark")

        // listen on color scheme change
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change",listener)
        }

        return () => {
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener("change",listener)
            }
        }

    },[])

    useEffect(() => {
        // toggle dark mode
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    },[isDarkMode])

    return(
        <div style={{height:"100%"}}>
            <button className='themeToggleBtn' type="button" title="DarkMode" onClick={()=>{setIsDarkMode(!isDarkMode)}}>
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