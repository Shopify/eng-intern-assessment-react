import React, { useState, useEffect } from 'react'
import {
  Page,
  Layout,
  Card,
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

      <Layout>
        <Layout.Section>
          <Card>
            <h1>Countdown Timer</h1>
          </Card>
        </Layout.Section>
      </Layout>

      <Layout>
        <Layout.Section variant='oneThird'>
          <Card>
            <h3>{ moment(time).format("mm") }</h3>
            <h3>Minutes</h3>
          </Card>
        </Layout.Section>

        <Layout.Section variant='oneThird'>
          <Card>
            <h3>{ moment(time).format("ss") }</h3>
            <h3>Seconds</h3>
          </Card>
        </Layout.Section>

        <Layout.Section variant='oneThird'>
          <Card>
            <h3>{ moment(time).format("SS") }</h3>
            <h3>Milliseconds</h3>
          </Card>
        </Layout.Section>
      </Layout>

      <Layout>
        <Layout.Section>
          <StopWatchButton time={ time } setTime={ setTime } isTimerActive={ isTimerActive } setIsTimerActive={ setIsTimerActive } lapTimes={ lapTimes } setLapTimes={ setLapTimes } />
        </Layout.Section>

        <Layout.Section>
          { lapTimes.length > 0 &&
            <Card>
              <LapTimesList lapTimes={ lapTimes } />
            </Card>
          }
        </Layout.Section>
      </Layout>

    </Page>
  )

}

