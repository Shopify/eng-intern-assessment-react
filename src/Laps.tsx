import React, { useState } from 'react'

interface LapsProps {
    lapList: string[];
}

const Laps: React.FC<LapsProps> = ({ lapList }) => {
    const listLaps = lapList.map((lap, index) => <li key={index}>{lap}</li>);
    return(
        <div>
            <h5>Laps</h5>
            <ol type="1">{listLaps}</ol>
        </div>
    )
}

export default Laps;