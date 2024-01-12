import React from "react";

export interface IStopWatchButtonProps {
  buttonText: string;
  onClickHandler: () => void;
}

export default function StopWatchButton(props: IStopWatchButtonProps) {
  const { buttonText, onClickHandler } = props;
  return (
    <div>
      <button onClick={onClickHandler}>{buttonText}</button>
    </div>
  );
}
