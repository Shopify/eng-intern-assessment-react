import React from "react";
import "./../css/SonicSprite.css";

import standGif from "./../../public/images/sonic/sonic-stand.gif";
import slowRunGif from "./../../public/images/sonic/sonic-slow-run.gif";
import medRunGif from "./../../public/images/sonic/sonic-med-run.gif";
import fastRunGif from "./../../public/images/sonic/sonic-fast-run.gif";

// sprite uses running state and workout level to determine which gif to display
type SonicSpriteProps = {
  isRunning: boolean;
  workout: number;
};

const SonicSprite: React.FC<SonicSpriteProps> = ({ isRunning, workout }) => {
  // default to standing gif
  let currentGif = standGif;
  let altText = "Sonic standing";

  if (isRunning) {
    // change gif based on workout level
    if (workout >= 30) {
      currentGif = fastRunGif;
      altText = "Sonic running fast";
    } else if (workout >= 15) {
      currentGif = medRunGif;
      altText = "Sonic running at medium speed";
    } else if (workout >= 1) {
      currentGif = slowRunGif;
      altText = "Sonic running slowly";
    }
  }

  return (
    <div className="sonic-sprite" role="img" aria-label={altText}>
      <img src={currentGif} alt={altText} />
    </div>
  );
};

export default SonicSprite;
