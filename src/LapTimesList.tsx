import React from 'react'
import moment from 'moment'
import { DataTable, } from '@shopify/polaris'

interface LapTimesListProps {
  lapTimes: Array<any>;
}

export default function LapTimesList(lapTimesObject: LapTimesListProps) {

  const { lapTimes } = lapTimesObject

  let totalLapTime = 0

  const rows = lapTimes.map((lapTime, index) => {
    totalLapTime += lapTime;

    return [
      index + 1,
      moment(lapTime).format("mm:ss:SS"),
      moment(totalLapTime).format("mm:ss:SS"),
    ];
  })

  return (
    <div>
      <DataTable
        columnContentTypes={ [ "text", "numeric", "numeric" ] }
        headings={ [ "Lap Number", "Split", "Total Time Elapsed" ] }
        rows={ rows }
        stickyHeader
      />
    </div >
  )
}

