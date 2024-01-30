import React from "react";

interface StopwatchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  hidden?: boolean;
  className?: string;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
  onClick,
  children,
  hidden,
  className,
}) => {
  const baseClass = "stopwatch__button";
  const classNames = className ? `${baseClass} ${className}` : baseClass;

  return hidden ? null : (
    <button className={classNames} onClick={onClick} disabled={hidden}>
      {children}
    </button>
  );
};

export default StopwatchButton;
