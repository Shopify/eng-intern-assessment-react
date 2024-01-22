/**
 * @fileoverview reusable Button component for stop watch functionalities like start, stop, etc
 */

import React, { ButtonHTMLAttributes } from "react";

// making the custom button component take props like a regular <button> would
type StopWatchButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  children,
  ...props
}) => {
  return <button {...props}>{children}</button>;
};
