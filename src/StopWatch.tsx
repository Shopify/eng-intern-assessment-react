import React, { useState, useEffect, useRef } from 'react'
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
import './styles/StopWatch.css';


export default function StopWatch() {

  // Timer function

  const [ time, setTime ] = useState(0)
  const [ isTimerActive, setIsTimerActive ] = useState(false)
  const [ lapTimes, setLapTimes ] = useState([])
  const [ lap, setLap ] = useState(0)


  // CHECK TIME COUNT
  let startTimeRef = useRef(null)

  useEffect(() => {
    let timerInterval: NodeJS.Timer = null;
    let lapInterval: NodeJS.Timer = null

    if (isTimerActive) {

      startTimeRef.current = performance.now() - time;

      timerInterval = setInterval(() => {
        setTime(performance.now() - startTimeRef.current);
      }, 10);

      lapInterval = setInterval(() => {
        setLap(performance.now() - startTimeRef.current);
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