import React, { useState, useEffect } from 'react'
import {
  Page,
  Layout,
  Card,
  InlineStack,
  Text,
} from '@shopify/polaris';

import moment from 'moment';
import LapTimesList from './LapTimesList';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css'


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

          <div className='timer-card'>
            <div className='timer-text'>
              <Text as='h1'>{ moment(time).format("mm:ss:SS") }</Text>
            </div>
          </div>
        </Layout.Section>


        {/* LAP TIMES TABLE SECTION*/ }
        <Layout.Section variant='fullWidth'>
          <InlineStack align="center">
            <StopWatchButton setTime={ setTime } isTimerActive={ isTimerActive } setIsTimerActive={ setIsTimerActive } lapTimes={ lapTimes } setLapTimes={ setLapTimes } lap={ lap } setLap={ setLap } />
          </InlineStack>
        </Layout.Section>

      </Card>

      <div id='lap-list'>
        { lapTimes.length > 0 &&
          <div style={ { paddingTop: "1rem" } } >
            <Card>
              <Layout.Section variant='fullWidth'>
                <LapTimesList lapTimes={ lapTimes } />
              </Layout.Section>
            </Card>
          </div >
        }
      </div>

    </Page >
  )

}