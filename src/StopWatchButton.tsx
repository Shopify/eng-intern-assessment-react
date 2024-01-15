import React from "react";

interface StopWatchButtonProps {
  btnAction: string;
  abilityDisable: boolean;
  onClick: () => void;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  const { btnAction, abilityDisable = false, onClick } = props;
  return (
    <div>
      <button disabled={abilityDisable} onClick={onClick}>
        {" "}
        {btnAction}
      </button>
    </div>
  );
}
