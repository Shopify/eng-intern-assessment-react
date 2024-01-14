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
          <Text as='h1' variant='heading3xl' fontWeight='bold' alignment='center'>Countdown Timer</Text>
        </Layout.Section>
      </Layout>

      <Layout>


        <div style={ { padding: "3rem" } }>
          <InlineGrid gap="500" columns={ [ 'oneThird', 'oneThird', 'oneThird' ] }>

            <Card>
              <div style={ { padding: "1rem" } } >
                <div style={ { padding: "3rem 0", fontSize: "7rem" } }>
                  <Text as='h1' fontWeight='bold' alignment='center'>{ moment(time).format("mm") }</Text>
                </div>
                <Text as='h1' variant='headingMd' fontWeight='bold' alignment='center'>MINUTES</Text>
              </div>
            </Card>

            <Card>
              <div style={ { padding: "1rem" } }>
                <div style={ { padding: "3rem 0", fontSize: "7rem" } }>
                  <Text as='h1' fontWeight='bold' alignment='center'>{ moment(time).format("ss") }</Text>
                </div>
                <Text as='h1' variant='headingMd' fontWeight='bold' alignment='center'>SECONDS</Text>
              </div >
            </Card>

            <Card>
              <div style={ { padding: "1rem" } }>
                <div style={ { padding: "3rem 0", fontSize: "7rem" } }>
                  <Text as='h1' fontWeight='bold' alignment='center'>{ moment(time).format("SS") }</Text>
                </div >
                <Text as='h1' variant='headingMd' fontWeight='bold' alignment='center'>MILLISECONDS</Text>
              </div>
            </Card>

          </InlineGrid>
        </div>




      </Layout>

      <Layout>
        <Layout.Section>
          <InlineStack align="center">
            <StopWatchButton time={ time } setTime={ setTime } isTimerActive={ isTimerActive } setIsTimerActive={ setIsTimerActive } lapTimes={ lapTimes } setLapTimes={ setLapTimes } />
          </InlineStack>
        </Layout.Section>

        <Layout.Section>
          { lapTimes.length > 0 &&
            <Card>
              <LapTimesList lapTimes={ lapTimes } />
            </Card>
          }
        </Layout.Section>
      </Layout>

    </Page >
  )

}

