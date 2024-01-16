import React, { useState, useEffect } from 'react'
import {
  Page,
  Layout,
  Card,
  InlineStack,
  Text,
  InlineGrid,
  BlockStack,
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
        <div className='timer-card'>

          <div className='timer-text'>

            <InlineStack align='center'>
              <Text as='h1' variant='headingLg'>{ moment(time).format("mm:ss:SS") }</Text>
            </InlineStack>
          </div>

        </div>

        <InlineStack align="center">
          <StopWatchButton setTime={ setTime } isTimerActive={ isTimerActive } setIsTimerActive={ setIsTimerActive } lapTimes={ lapTimes } setLapTimes={ setLapTimes } lap={ lap } setLap={ setLap } />
        </InlineStack>
      </Card>

      <div className='timer-card-laps'>
        { lapTimes.length > 0 &&
          <Card padding="0">
            <LapTimesList lapTimes={ lapTimes } />
          </Card>
        }
      </div>


    </Page >
  )

}