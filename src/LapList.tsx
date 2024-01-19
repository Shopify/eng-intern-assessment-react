// LapList.tsx
/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { formatTime } from "./utils/formatTime";
import { css } from "@emotion/react";
import { colors } from "./utils/colors";

const listItemStyle = css({
   backgroundColor: colors.secondary_bg,
   borderColor: colors.green,
   minWidth: "250px",
   color: colors.text,
});

const scrollableLapListStyle = css({
   maxHeight: "500px",
   overflowY: "auto",
   backgroundColor: colors.secondary_bg,
   borderColor: colors.green,
   color: colors.text,
});

interface LapListProps {
   laps: number[];
}

export default function LapList({ laps }: LapListProps) {
   // used to scroll into view when a new lap is added
   const endOfListRef = useRef<null | HTMLLIElement>(null);
   // Determine which style to use based on the number of laps
   const listStyle = laps.length > 12 ? scrollableLapListStyle : listItemStyle;

   // scroll to end of list upon lap button press
   useEffect(() => {
      if (endOfListRef.current) {
         endOfListRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [laps]);

   return (
      <ol className="list-group list-group-numbered my-4" css={listStyle}>
         {laps.map((lap, index) => (
            <li
               key={index}
               className="list-group-item"
               css={listItemStyle}
               ref={index === laps.length - 1 ? endOfListRef : null}
            >
               {formatTime(lap)}
            </li>
         ))}
      </ol>
   );
}
