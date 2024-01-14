import React, { useState, useEffect, useRef } from 'react'
import {
  Page,
  Layout,
  Card,
  InlineStack,
  Text,
  InlineGrid,
  Box,
  Grid,
} from '@shopify/polaris';
import moment from 'moment';
import LapTimesList from './LapTimesList';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css';


export default function StopWatch() {

  // Timer function

  const [ time, setTime ] = useState(0)
  const [ isTimerActive, setIsTimerActive ] = useState(false)

  const [ lapTimes, setLapTimes ] = useState([])
  const [ lap, setLap ] = useState(0)


  let timerInterval: any = null
  let timerIntervalRef = useRef<any>(null)

  let lapInterval: any = null
  let lapIntervalRef = useRef<any>(null)


  // CHECK TIME COUNT
  useEffect(() => {
    if (isTimerActive) {
      timerIntervalRef.current = setInterval(() => setTime((time) => time + 1), 0);
      lapIntervalRef.current = setInterval(() => setLap((elapsedTime) => elapsedTime + 1), 0)
    } return () => {
      clearInterval(timerIntervalRef.current)
      clearInterval(lapIntervalRef.current)

    }
  }, [ time, isTimerActive ])

  return (
    <Page>

      <Layout>

        {/* HEADER SECTION */ }
        <Layout.Section variant='fullWidth'>
          <Text as='h1' variant='headingXl' fontWeight='bold' alignment='center'>Countdown Timer</Text>
        </Layout.Section>


        {/* TIMER SECTION */ }


        <Layout.Section>

          <Text as='h1' variant='heading3xl' fontWeight='bold' alignment='center'>{ moment(time).format("mm: ss: SS") }</Text>

        </Layout.Section>


        {/* LAP TIMES TABLE SECTION*/ }
        <Layout.Section variant='fullWidth'>
          <InlineStack align="center">
            <StopWatchButton time={ time } setTime={ setTime } isTimerActive={ isTimerActive } setIsTimerActive={ setIsTimerActive } lapTimes={ lapTimes } setLapTimes={ setLapTimes } lap={ lap } setLap={ setLap } />
          </InlineStack>
        </Layout.Section>

        <Layout.Section>
          {/* { lapTimes.length > 0 && */ }
          {
            <Card>
              <LapTimesList lapTimes={ lapTimes } />
            </Card>
          }
        </Layout.Section>
      </Layout>

    </Page >
  )

}

