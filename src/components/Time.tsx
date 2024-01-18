import React from 'react';
import { formatTimeUnit } from '../utils/time-formater';
import * as mq from '../styles/media-queries';
import { css } from '@emotion/react';
import * as Enums from '../utils/enums';

interface DisplayTimeProps {
  time: number;
  fontSize?: number;
  color?: string;
}

const Time: React.FC<DisplayTimeProps> = ({
  time,
  fontSize = 50,
  color = 'white',
}) => {
  const unitStyle = (unit: Enums.TimeUnit) =>
    css({
      [mq.small]: {
        minWidth: fontSize * 1.2,
      },
      [mq.medium]: {
        minWidth: fontSize * 1.4,
      },
      [mq.large]: {
        minWidth: fontSize * 1.8,
      },
    });

  const timeStyle = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: color,
    fontSize: fontSize,
    [mq.small]: {
      fontSize: fontSize * 0.8,
    },
    [mq.medium]: {
      fontSize: fontSize * 0.9,
    },
    [mq.large]: {
      fontSize: fontSize * 1.1,
    },
  });

  return (
    <div css={timeStyle}>
      <div data-testid="hours" css={unitStyle(Enums.TimeUnit.Hours)}>
        {formatTimeUnit(time, Enums.TimeUnit.Hours)}
      </div>
      <div>:</div>
      <div data-testid="minutes" css={unitStyle(Enums.TimeUnit.Minutes)}>
        {formatTimeUnit(time, Enums.TimeUnit.Minutes)}
      </div>
      <div>:</div>
      <div data-testid="seconds" css={unitStyle(Enums.TimeUnit.Seconds)}>
        {formatTimeUnit(time, Enums.TimeUnit.Seconds)}
      </div>
      <div>:</div>
      <div
        data-testid="centiseconds"
        css={unitStyle(Enums.TimeUnit.Centiseconds)}
      >
        {formatTimeUnit(time, Enums.TimeUnit.Centiseconds)}
      </div>
    </div>
  );
};

export default Time;
