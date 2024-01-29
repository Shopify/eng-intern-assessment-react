/**
 * @fileoverview standalone component to display formatted time in format 00:00:00
 */

import React from "react";

export const Time: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div role="display-time">
      <span>
        {("0" + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}:
      </span>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
    </div>
  );
};
