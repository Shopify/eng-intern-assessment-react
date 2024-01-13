import React from "react";

interface StopWatchButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const StopWatchButton = React.forwardRef<HTMLButtonElement, StopWatchButtonProps>(({ ...props }, ref) => {
  return <button ref={ref} {...props} />;
});

export default StopWatchButton;
