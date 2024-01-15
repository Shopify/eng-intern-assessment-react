import React from 'react'
import moment from 'moment';
import {
  Page,
  Layout,
  DataTable,
  BlockStack,

} from '@shopify/polaris';


interface LapTimesListProps {
  lapTimes: Array<any>;
}

export default function LapTimesList(lapTimesObject: LapTimesListProps) {

  const { lapTimes } = lapTimesObject

  let totalLapTime = 0

  const rows = lapTimes.map((lapTime, index) => {
    totalLapTime += lapTime;
    return [ index + 1, moment(lapTime).format("mm:ss.SS"), moment(totalLapTime).format("mm:ss.SS") ];
  })

  return (
    <div style={ { padding: "1rem" } }>
      <Layout.Section>
        <BlockStack>
          <DataTable columnContentTypes={ [ "text", "text", "text" ] } headings={ [ "Lap Number", "Split", "Total Time Elapsed" ] } rows={ rows } stickyHeader />
        </BlockStack>
      </Layout.Section>
    </div >
  )
}

