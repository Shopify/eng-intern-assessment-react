import React, { useState } from 'react'
import moment from 'moment';
import {
  Page,
  Layout,
  Card,
  ResourceList,
  Thumbnail,
  Text,
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
    return [ index + 1, moment(lapTime).format("mm:ss:SS"), moment(totalLapTime).format("mm:ss:SS") ];
  })

  return (
    <ul className='lap-times-list' >
      <BlockStack gap={ "300" }>
        <DataTable columnContentTypes={ [ "text", "text", "text" ] } headings={ [ "Lap Number", "Lap Time", "Total Time Elapsed" ] } rows={ rows } />
      </BlockStack>

    </ul>
  )
}

