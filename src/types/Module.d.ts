/**
 * StopWatchBtnProps: holds stopwatch button properties utilize in StopWatchBtn.tsx component as props
 */
declare type StopWatchBtnProps = {
  name: string;
  className: string;
  btnType: { label: string; isActive: boolean };
  onButtonClick: Function;
};

/**
 * TimeProps: holds stopwatch time value utilize in Time.tsx component as props
 */
declare type TimeProps = {
  className: string;
  time: {
    milli: number;
    second: number;
    minute: number;
    hour: number;
  };
};

/**
 * TimeType: holds stopwatch time value utilize in StopWatch.tsx component
 */
declare type TimeType = {
  milli: number;
  second: number;
  minute: number;
  hour: number;
};

/**
 * DateTimeTYpe: holds stopwatch time in millis utilize in StopWatch.tsx component
 */
declare type DateTimeType = {
  currentTime: number;
  pausedTime: number;
  capturedTime: number;
};
