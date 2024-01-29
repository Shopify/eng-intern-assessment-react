import React from "react";
import "./ClockLoader.css";

interface Props {
   className: string,
   loadingSpeed: number,
   clockColor: string,
   loadingColor: string
}

export default function ClockLoader({className, loadingSpeed, clockColor, loadingColor} : Props) {
   return (
      <div className={className}>
         <div className="loader" style={{animationDuration: `${loadingSpeed}s`, borderColor: loadingColor}}></div>
         <svg
            version="1.1"
            id="L2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enable-background="new 0 0 100 100"
         >
            <circle fill="none" stroke={clockColor} stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48" />
            <line
               fill="none"
               stroke-linecap="round"
               stroke={clockColor}
               stroke-width="4"
               stroke-miterlimit="10"
               x1="50"
               y1="50"
               x2="50"
               y2="15"
            >
               <animateTransform
                  attributeName="transform"
                  dur={`${loadingSpeed}s`}
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
               />
            </line>
            <line
               fill="none"
               stroke-linecap="round"
               stroke={clockColor}
               stroke-width="4"
               stroke-miterlimit="10"
               x1="50"
               y1="50"
               x2="50"
               y2="22"
            >
               <animateTransform
                  attributeName="transform"
                  dur={`${loadingSpeed * 7.5}s`}
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
               />
            </line>
         </svg>
      </div>
   );
}