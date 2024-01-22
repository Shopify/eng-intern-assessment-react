import React from 'react'
import StopWatchWrapper from './components/StopWatch/StopWatchWrapper'
import StyleForm from './components/StyleForm'
import {useDemo} from './components/StopWatch/hooks/useDemo'
import { AnalogDisplay, DigitalDisplay,StopWatchButtonGroup } from './components/StopWatch/'
import { LapDisplay } from './components/StopWatch/LapDisplay'
// import {StopWatchButtonGroupProps} from "./components/StopWatch/"
export default function StopWatch() {
    const { formCallback, darkMode,setDarkMode,setAnalogBackgroundImage, useSecondTicks, analogBackgroundImage, analogSize, complicationSize } = useDemo();
    console.log("COMLPICATION SIZE: ", complicationSize)
    return(
        <div style={{
            display:'flex',
            flexDirection:'row',
        }}>
            <StopWatchWrapper darkTheme={darkMode}  >
                <AnalogDisplay 
                    secondTicks={useSecondTicks}
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
            </StopWatchWrapper>
            <StyleForm handleFormSubmit={formCallback} handleSelectChange={setAnalogBackgroundImage} handleThemeSelect={setDarkMode} />
        </div>
    )
}