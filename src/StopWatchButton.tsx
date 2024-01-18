import React from 'react'
import { BlockStack, Button, InlineStack, Page, Text } from '@shopify/polaris'

// Props used to receive button infformation from App.tsx
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

                <Text variant='heading3xl' as='h1' alignment='center'> Stopwatch </Text>
                
                <InlineStack gap='400' align='space-evenly'>


                    {/* 
                    Used to start and stop the stopwatch. Start and stop are set
                    as the text of the button depending on if the stopwatch is
                    running or not.
                    */}
                    <Button size='large' variant='primary' onClick={startStop}>
                        {isRunning ? "Stop" :  "Start"}
                    </Button>


                    {/* Used to reset the stopwatch. */}
                    <Button size='large' variant='primary' onClick={resetButton}>
                        Reset
                    </Button>


                    {/* 
                    Used to create a new lap and store the previous lap 
                    information.
                     */}
                    <Button size='large' variant='primary' onClick={lapButton}>
                        Lap
                    </Button>

                </InlineStack>

            </BlockStack>
        </Page>
       
    )
}