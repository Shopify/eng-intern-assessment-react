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
  return (
    <button
      {...props}
      className="px-7 py-2 bg-button-primary-default text-white transition duration-200 ease-in-out hover:bg-button-primary-hover focus:outline focus:outline-offset-2 focus:outline-focus-outline font-medium rounded-md"
    >
      {children}
    </button>
  );
};
