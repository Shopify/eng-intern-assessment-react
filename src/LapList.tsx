/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "./utils/colors";

import React from "react";
import { formatTime } from "./utils/formatTime";

const lapListStyle = css({
   backgroundColor: `${colors.secondary_bg} !important`,
   borderColor: colors.green,
   color: colors.text,
});

interface LapListProps {
   laps: number[];
}

export default function LapList({ laps }: LapListProps) {
   return (
      <ol className="list-group list-group-numbered my-4">
         {laps.map((lap, index) => (
            <li key={index} className="list-group-item" css={lapListStyle}>
               {formatTime(lap)}
            </li>
         ))}
      </ol>
   );
}
