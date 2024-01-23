import React, { useCallback } from 'react';

export function useDemo(){
    const [analogBackgroundImage, setAnalogBackgroundImage] = React.useState<string | undefined>(undefined)
    const [darkMode, setDarkMode] = React.useState<boolean>(true)
    const [analogSize, setAnalogSize] = React.useState<number>(300)
    const [complicationSize, setComplicationSize] = React.useState<number>(75)
    const [useSecondTicks, setUseSecondTicks] = React.useState<boolean>(true)

    const handleSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        const analogSize = !Number(e.target['analog-size'].value) || isNaN(Number(e.target['analog-size'].value)) || Number(e.target['analog-size'].value) < 100 ? 300: Number(e.target['analog-size'].value)
        //@ts-ignore
        setAnalogSize(analogSize)

        //@ts-ignore
        const complicationSize = !Number(e.target['complication-size'].value) || isNaN(Number(e.target['complication-size'].value)) || Number(e.target['complication-size'].value) < 20 ? 50: Number(e.target['complication-size'].value)
        console.log("complicationSize",complicationSize)
        //@ts-ignore
        setComplicationSize(complicationSize)

        //@ts-ignore
        setUseSecondTicks(e.target['second-ticks'].value === "true")
    },[setAnalogSize, setComplicationSize, setUseSecondTicks])




    

    return {
        formCallback: handleSubmit,
        darkMode,
        setDarkMode,
        setAnalogBackgroundImage,
        analogBackgroundImage,
        analogSize,
        complicationSize,
        useSecondTicks,
    }
}