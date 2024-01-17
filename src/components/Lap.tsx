import React from 'react';
import Time from './Time';
import * as mq from '../styles/media-queries';
import { css } from '@emotion/react';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ThumbDownIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUpOffAlt';
import * as colors from '../styles/colors';
import * as Enums from '../utils/enums';

interface LapProps {
  lap: number;
  index: number;
  rating: Enums.LapRating;
}

const Lap: React.FC<LapProps> = ({ lap, index, rating }) => {
  const size = 30;

  // Returns lap color depends on the lap rating
  const lapColor = (): string => {
    switch (rating) {
      case Enums.LapRating.Best:
        return colors.green;
      case Enums.LapRating.Worst:
        return colors.orange;
      default:
        return colors.white;
    }
  };

  // Returns lap icon depends on the lap rating
  const LapIcon = (): JSX.Element => {
    const styleIcon = {
      fontSize: '20px',
      padding: '5px',
      border: `1px solid ${lapColor()}`,
      borderRadius: '50%',
    };

    switch (rating) {
      case Enums.LapRating.Best:
        return <ThumbUpIcon style={styleIcon} />;
      case Enums.LapRating.Worst:
        return <ThumbDownIcon style={styleIcon} />;
      default:
        return <SportsScoreIcon style={styleIcon} />;
    }
  };

  // Styles for the main container
  const containerStyle = css({
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '5px 0px',
    color: lapColor(),
    [mq.small]: {
      fontSize: size * 0.8,
    },
    [mq.medium]: {
      fontSize: size * 0.9,
    },
    [mq.large]: {
      fontSize: size * 1.1,
    },
  });

  // Styles for the lap icon
  const iconStyle = css({
    margin: 'auto 5px',
    textAlign: 'center',
    height: '40px',
    [mq.large]: {
      paddingTop: '5px',
    },
  });

  // Styles for the time
  const labelStyle = css({
    display: 'flex',
    textAlign: 'start',
    flexDirection: 'row',
    justifyContent: 'start',
    width: '40%',
    color: lapColor(),
    [mq.medium]: {
      width: '35%',
    },
    [mq.large]: {
      width: '30%',
    },
  });

  // Styles for the time
  const timeStyle = css({
    textAlign: 'center',
    color: lapColor(),
  });

  return (
    <div
      key={index}
      css={{
        ...containerStyle,
      }}
    >
      <div css={labelStyle}>
        <div css={iconStyle}>
          <LapIcon />
        </div>
        <div>{`Lap ${index + 1}`}</div>
      </div>
      <div css={timeStyle}>
        <Time time={lap} fontSize={size} color={lapColor()} />
      </div>
    </div>
  );
};

export default Lap;
