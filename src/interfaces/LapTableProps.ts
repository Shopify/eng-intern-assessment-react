interface LapTableProps {
  lapTimes: LapEntry[];
}

interface LapEntry {
  lapNumber: number;
  lapTime: number;
}

export default LapTableProps;
