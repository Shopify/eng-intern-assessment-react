/**
 * StopWatchBtnProps: holds stopwatch button properties utilize in StopWatchBtn.tsx component as props
 */
declare type StopWatchBtnProps = {
  name: string;
  className: string;
  btnType: { label: string; isActive: boolean };
  onButtonClick: Function;
};
