import React, { useState, useEffect } from 'react'
import {
  Page,
  Layout,
  Card,
  InlineStack,
  Text,
  InlineGrid,
} from '@shopify/polaris';
import moment from 'moment';
import LapTimesList from './LapTimesList';
import StopWatchButton from './StopWatchButton';


export default function StopWatch() {
  const [ time, setTime ] = useState(0)
  const [ isTimerActive, setIsTimerActive ] = useState(false)
  const [ lapTimes, setLapTimes ] = useState([])
  const [ lap, setLap ] = useState(0)

  useEffect(() => {
    let timerInterval: NodeJS.Timer = null;
    let lapInterval: NodeJS.Timer = null

    if (isTimerActive) {

      let startTime = performance.now() - time

      timerInterval = setInterval(() => {
        setTime(performance.now() - startTime);
      }, 10);

      lapInterval = setInterval(() => {
        setLap(((prevLapTime) => prevLapTime + 10));
      }, 10);

    } else {
      clearInterval(timerInterval)
      clearInterval(lapInterval)
    }
    return () => {
      clearInterval(timerInterval)
      clearInterval(lapInterval)
    }
  }, [ isTimerActive ])



  return (

    <Page narrowWidth>
      <Card>
        <Layout.Section variant='fullWidth'>
          <div style={ { padding: "5rem 0 3rem 0" } }>
            <InlineGrid columns={ 3 }>
              <div>
                <div style={ { fontSize: "3rem", paddingBottom: "1rem" } }>
                  <Text as='h1' fontWeight='bold' alignment='center'>{ moment(time).format("mm") }</Text>
                </div>
                <div style={ { fontSize: "1rem" } }>
                  <Text as="p" alignment='center'>MINUTES</Text>
                </div>
              </div>
              <div>
                <div style={ { fontSize: "3rem", paddingBottom: "1rem" } }>
                  <Text as='h1' fontWeight='bold' alignment='center'>{ moment(time).format("ss") }</Text>
                </div>
                <div style={ { fontSize: "1rem" } }>
                  <Text as="p" alignment='center'>SECONDS</Text>
                </div>
              </div>
              <div>
                <div style={ { fontSize: "3rem", paddingBottom: "1rem" } }>
                  <Text as='h1' fontWeight='bold' alignment='center'>{ moment(time).format("SS") }</Text>
                </div>
                <div style={ { fontSize: "1rem" } }>
                  <Text as="p" alignment='center'>MILLISECONDS</Text>
                </div>
              </div>
            </InlineGrid>
          </div>
        </Layout.Section>

        {/* LAP TIMES TABLE SECTION*/ }
        <Layout.Section variant='fullWidth'>
          <InlineStack align="center">
            <StopWatchButton setTime={ setTime } isTimerActive={ isTimerActive } setIsTimerActive={ setIsTimerActive } lapTimes={ lapTimes } setLapTimes={ setLapTimes } lap={ lap } setLap={ setLap } />
          </InlineStack>
        </Layout.Section>

      </Card>

      <Layout.Section>
        { lapTimes.length > 0 &&
          <Card>
            <LapTimesList lapTimes={ lapTimes } />
          </Card>
        }
      </Layout.Section>



    </Page >
  )

}