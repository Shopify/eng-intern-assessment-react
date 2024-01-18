import React, { memo } from 'react';
import Alarm from '@mui/icons-material/Alarm';
import { css } from '@emotion/react';
import * as colors from '../styles/colors';
import * as mq from '../styles/media-queries';

// Common size for the icon and text
const size = 40;

// Media query styles for adjusting font size based on screen size
const mediaQueryStyles = css({
  [mq.small]: {
    fontSize: size * 0.7,
  },
  [mq.medium]: {
    fontSize: size * 1.1,
  },
  [mq.large]: {
    fontSize: size * 1.2,
  },
});

// Styles for the container
const containerStyles = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: '50px',
  marginBottom: '50px',
});

// Styles for the icon
const iconStyles = css({
  color: colors.white,
});

// Styles for the text
const textStyles = css({
  textAlign: 'center',
  fontWeight: 'bold',
  margin: '0 15px 0 15px',
  color: colors.white,
});

// Header component
function Header() {
  return (
    <div css={[containerStyles, mediaQueryStyles]}>
      {/* Icon */}
      <div>
        <Alarm css={[iconStyles, mediaQueryStyles]} />
      </div>
      {/* Text */}
      <div css={[textStyles, mediaQueryStyles]}>Stopwatch App</div>
    </div>
  );
}

export default memo(Header);
