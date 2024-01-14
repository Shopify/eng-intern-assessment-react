import React, { useState, useEffect } from 'react'
import {
  Page,
  Layout,
  Card,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import moment from 'moment';
import LapTimesList from './LapTimesList';
import StopWatchButton from './StopWatchButton';


export default function StopWatch() {

  // Timer function

  const [ time, setTime ] = useState(0)
  const [ isTimerActive, setIsTimerActive ] = useState(false)
  const [ lapTimes, setLapTimes ] = useState([])


  let timer: any = null

  // CHECK TIME COUNT
  useEffect(() => {
    if (isTimerActive) {
      timer = setInterval(() => {
        setTime(time + 1);
      }, 0);
    } return () => clearInterval(timer)

  }, [ time, isTimerActive ])



  return (
    <Page fullWidth>
      <Layout.Section variant="oneHalf">
        <Card>
          <h1>Countdown Timer</h1>
          <p>{ moment(time).format("mm:ss:SS") }</p>
          <StopWatchButton time={ time } setTime={ setTime } isTimerActive={ isTimerActive } setIsTimerActive={ setIsTimerActive } lapTimes={ lapTimes } setLapTimes={ setLapTimes } />
        </Card>
      </Layout.Section>
      <Layout.Section variant="oneHalf">
        <Card>
          <LapTimesList lapTimes={ lapTimes } />
        </Card>
      </Layout.Section>
    </Page>
  )
}

