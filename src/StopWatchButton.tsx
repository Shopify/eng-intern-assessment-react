import React from "react";

interface StopwatchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  hidden?: boolean;
  className?: string;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
  onClick,
  children,
  label,
  hidden,
  className,
}) => {
  const baseClass = "stopwatch__button";
  const classNames = className ? `${baseClass} ${className}` : baseClass;

  return hidden ? null : (
    <button className={classNames} onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
};

export default StopwatchButton;
