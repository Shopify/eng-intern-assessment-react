import { Text, DataTable, Grid, Page, Scrollable, Box, BlockStack } from '@shopify/polaris'
import React from 'react'

// Props used to receive data from App.tsx.
interface StopwatchProps {
    currentTime: number
    totalTime: number
    lapTimes: number[]
    totalTimes: number[]
}


export default function StopWatch({
    currentTime,
    totalTime,
    lapTimes,
    totalTimes} : StopwatchProps) {


    // Math.floor rounds down to the nearest integer (i.e. 1.9 = 1).

    /*
    The values: seconds, totalSeconds, minutes, totalMinutes, hours, totalHours are
    caluclated every second when the total and current times are sent from App.tsx.
    */

    // Calculates current (lap time) number of seconds.
    const seconds = Math.floor(currentTime % 60) 

    // Calculates total number of seconds.
    const totalSeconds = Math.floor(totalTime % 60) 
    
    // Calculates current (lap time) number of minutes.
    const minutes = Math.floor((currentTime % 3600)/60) 

    // Calculates total number of minutes.
    const totalMinutes = Math.floor((totalTime % 3600)/60) 
    
    // Calculates current (lap time) number of hours.
    const hours = Math.floor(currentTime / 3600) 

    // Calculates total number of hours.
    const totalHours = Math.floor(totalTime / 3600) 


    /*
    Used to store lap information of each lap. This array takes in the lapTimes array
    and the totalTimes array from App.tsx containing the lap times and total elapsed 
    times at that lap respectively, and maps them to the combinedLapInfo array along
    with the Lap number so that they can be used in the <DataTable/> component.
    */
    const combinedLapInfo = lapTimes.map((lap, index) => [
        "Lap " + (index + 1), 
        (Math.floor(lap / 3600)).toString().padStart(2, "0") +':'
        + (Math.floor((lap % 3600)/60)).toString().padStart(2, "0") + ':'
        + (Math.floor(lap % 60)).toString().padStart(2, "0"),
        (Math.floor(totalTimes[index] / 3600)).toString().padStart(2, "0") +':'
        + (Math.floor((totalTimes[index] % 3600)/60)).toString().padStart(2, "0") + ':'
        + (Math.floor(totalTimes[index] % 60)).toString().padStart(2, "0")])


    return(
        
        <Page>
            <BlockStack gap='600' align='center'>
                
                    <Grid>
                        {/* Displays current lap time. */}
                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                            <Box shadow='500' background='bg-surface' borderRadius='200'>
                                <div style={{height: '20vh'}}>
                                    <BlockStack gap='300' align='center'>
                                        <Text variant='headingXl' as='h1' alignment='center'>
                                            {"  "}
                                        </Text>
                                        <Text variant='headingLg' as='h1' alignment='center'>
                                            Current Lap Time
                                        </Text>
                                        <Text variant='heading3xl' as='h1' alignment='center'>
                                            {hours.toString().padStart(2, "0")}:
                                            {minutes.toString().padStart(2, "0")}:
                                            {seconds.toString().padStart(2, "0")}
                                        </Text>
                                    </BlockStack>
                                </div>
                            </Box> 
                        </Grid.Cell>


                        {/* Displays total elapsed time since start was pressed. */}
                        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                            <Box shadow='500' background='bg-surface' borderRadius='200'>
                                <div style={{height: '20vh'}}>
                                    <BlockStack gap='300' align='center'>
                                        <Text variant='headingXl' as='h1' alignment='center'>
                                            {"  "}
                                        </Text>
                                        <Text variant='headingLg' as='h1' alignment='center'>
                                            Total Elapsed Time
                                        </Text>
                                        <Text variant='heading3xl' as='h2' alignment='center'>
                                            {totalHours.toString().padStart(2, "0")}:
                                            {totalMinutes.toString().padStart(2, "0")}:
                                            {totalSeconds.toString().padStart(2, "0")}
                                        </Text>
                                    </BlockStack>
                                </div>
                            </Box>
                        </Grid.Cell>
                    </Grid>
                    
                    <Box shadow='500' background='bg-surface' borderRadius='200'>
                        <div style={{height: '40vh'}}>
                            <Scrollable style={{height: '100%', borderRadius:'200'}} focusable>
                                {/* Data table to show lap information. */}
                                <DataTable columnContentTypes={[
                                'text',
                                'text',
                                'text'
                                ]}
                                headings={[
                                "Lap Number", 
                                "Lap Time", 
                                "Total Elapsed Time"]}
                                rows={combinedLapInfo}
                                stickyHeader/>
                            </Scrollable>
                        </div>
                    </Box>
                      
            </BlockStack>   
        </Page>
       
    )
}