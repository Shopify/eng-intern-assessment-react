import React from 'react'
import StopWatch from './components/StopWatch/StopWatch'
import StyleForm from './components/StyleForm'
import {useDemo} from './components/StopWatch/hooks/useDemo'
import { AnalogDisplay, DigitalDisplay,StopWatchButtonGroup } from './components/StopWatch/'
import { LapDisplay } from './components/StopWatch/LapDisplay'
// import {StopWatchButtonGroupProps} from "./components/StopWatch/"
export default function App() {
    const { formCallback, darkMode,setDarkMode,setAnalogBackgroundImage, analogBackgroundImage, analogSize, complicationSize } = useDemo();
    console.log("COMLPICATION SIZE: ", complicationSize)
    return(
        <div>
            <StopWatch darkTheme={darkMode}  >
                <AnalogDisplay 
                    backgroundImage={analogBackgroundImage}
                    clockSize={analogSize}
                    ComplicationProps={
                        {
                            clockSize: complicationSize,
                        }
                    }
                
            />
                <StopWatchButtonGroup />
                <DigitalDisplay  />
                <LapDisplay  />
            </StopWatch>
            <StyleForm handleFormSubmit={formCallback} handleSelectChange={setAnalogBackgroundImage} handleThemeSelect={setDarkMode} />
        </div>
    )
}