import React from 'react'
import { BlockStack, Button, InlineStack, Page, Text } from '@shopify/polaris'


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
        
        <Page >
            <BlockStack gap='500' align='center'>
                <Text variant='heading3xl' as='h1' alignment='center'> Stopwatch App</Text>
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
            </BlockStack>
        </Page>
       
    )
}