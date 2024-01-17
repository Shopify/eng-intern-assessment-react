import React from 'react'
import { Button, InlineStack, Page } from '@shopify/polaris'


interface StopWatchButtonProps {
    isRunning: boolean
    startStop : () => void
    lapButton : () => void
    resetButton : () => void
}

export default function StopWatchButton({
    isRunning, 
    startStop, 
    lapButton, 
    resetButton} : StopWatchButtonProps) {
    return(
        
        <Page fullWidth>
            <div style={{height:'15vh'}}>
            <InlineStack gap='400' align='space-evenly'>
            <Button size='large' variant='primary' onClick={startStop}>
                {isRunning ? "Stop" :  "Start"}
            </Button>
            <Button size='large' variant='primary' onClick={resetButton}>
                Reset
            </Button>
            <Button size='large' variant='primary' onClick={lapButton}>
                Lap
            </Button>
            
            </InlineStack>
            </div>
        </Page>
       
    )
}