import React, { memo } from 'react';
import Lap from './Lap';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import * as mq from '../styles/media-queries';
import * as Enums from '../utils/enums';
import * as colors from '../styles/colors';
import { css } from '@emotion/react';

interface LapProps {
  laps: { timestamp: number; duration: number }[];
}

const LapsList: React.FC<LapProps> = ({ laps }) => {
  // Find the index of the best and worst laps
  const bestLapIndex = laps.reduce(
    (bestIndex, lap, currentIndex) =>
      lap.duration < laps[bestIndex].duration ? currentIndex : bestIndex,
    0
  );
  const worstLapIndex = laps.reduce(
    (worstIndex, lap, currentIndex) =>
      lap.duration > laps[worstIndex].duration ? currentIndex : worstIndex,
    0
  );

  // Determine the lap rating based on best and worst lap indices
  const getLapRating = (index: number) => {
    if (laps.length > 2) {
      if (index === bestLapIndex) {
        return Enums.LapRating.Best;
      } else if (index === worstLapIndex) {
        return Enums.LapRating.Worst;
      }
      return Enums.LapRating.Default;
    }
    return Enums.LapRating.Default;
  };

  const lapsContainerStyle = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    color: 'white',
    [mq.large]: {
      minHeight: '320px',
      border: `2px solid ${colors.white}`,
      borderRadius: '5px',
    },
  })

  const lapsHeaderStyle = css ({
    fontSize: '25px',
    padding: '10px 0px',
    color: 'white',
    width: '80%',
    textAlign: 'center',
    margin: '10px auto',
    borderBottom: `1px solid ${colors.white}`,
    [mq.large]: {
      fontSize: '30px',
    },
  });

  const lapsPlaceholderStyle=  css({
    fontSize: '20px',
    padding: '10px 0px',
    color: 'white',
    width: '80%',
    textAlign: 'center',
    margin: '10px auto',
  });


  return (
    <div css={lapsContainerStyle}>
      {/* Laps header */}
      <div css={lapsHeaderStyle}>Laps</div>
      {/* Render laps or placeholder */}
      {laps.length > 0 ? (
        <div data-testid="lap-list">
          {laps
            .slice()
            .reverse()
            .map((lap, index) => (
              <Lap
                key={index}
                lap={lap.duration}
                index={laps.length - index - 1}
                rating={getLapRating(laps.length - index - 1)}
              />
            ))}
        </div>
      ) : (
        <div
          data-testid="lap-placeholder"
          css={lapsPlaceholderStyle}
        >
          {/* Placeholder content */}
          <div>
            <div>
              <SportsScoreIcon style={{fontSize: ' 50px',}}/>
            </div>
            <div>Start stopwatch and add laps</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(LapsList);
