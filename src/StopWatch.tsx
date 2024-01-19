/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "./utils/colors";

import React, { useEffect } from "react";
import { formatTime } from "./utils/formatTime";

const stopwatchStyle = css({
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   fontSize: "50px",
   backgroundColor: colors.secondary_bg,
   border: `1px solid ${colors.green}`,
   borderRadius: "10px",
   padding: "1.5rem",
});

interface StopwatchProps {
   isActive: boolean;
   isReset: boolean;
   time: number;
   setTime: (time: number) => void;
   handleReset: () => void;
}

export default function StopWatch({
   isActive,
   isReset,
   time,
   setTime,
   handleReset,
}: StopwatchProps) {
   useEffect(() => {
      let interval: NodeJS.Timeout;

      if (isActive) {
         interval = setInterval(() => {
            setTime(time + 10);
         }, 10);
      } else if (!isActive && time !== 0) {
         clearInterval(interval);
      }

      if (isReset) {
         setTime(0);
         handleReset();
      }

      return () => clearInterval(interval);
   }, [isActive, isReset, setTime, handleReset, time]);

   return (
      <>
         <p css={stopwatchStyle}>{formatTime(time)}</p>
      </>
   );
}
