import React from 'react';

import standGif from '../public/images/sonic/sonic-stand.gif';
import slowRunGif from '../public/images/sonic/sonic-slow-run.gif';
import medRunGif from '../public/images/sonic/sonic-med-run.gif';
import fastRunGif from '../public/images/sonic/sonic-fast-run.gif';

type SonicSpriteProps = {
    isRunning: boolean;
    workout: number;
};

const SonicSprite: React.FC<SonicSpriteProps> = ({ isRunning, workout }) => {
    let currentGif = standGif;

    if (isRunning) {
        if (workout >= 50) {
            currentGif = fastRunGif;
        } else if (workout >= 20) {
            currentGif = medRunGif;
        } else if (workout >= 1) {
            currentGif = slowRunGif;
        }
    }

    return (
        <div className="sonic-sprite">
            <img src={currentGif} alt="Sonic Running" />
        </div>
    );
};

export default SonicSprite;
