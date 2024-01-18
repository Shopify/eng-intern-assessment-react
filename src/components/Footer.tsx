import React, { memo } from 'react';
import { css } from '@emotion/react';
import * as colors from '../styles/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';

// Styles for the main container
const containerStyles = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  borderTop: '1px solid #ddd',
  padding: '20px',
  color: colors.white,
});

// Styles for the link container
const linkContainerStyles = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

// Styles for links
const linkStyles = css({
  color: colors.orange,
  textDecoration: 'none',
});

// Styles for the GitHub icon
const iconStyles = css({
  marginRight: '10px',
});

// Footer component
const Footer = () => {
  return (
    <div css={containerStyles}>
      <div css={linkContainerStyles}>
        <span css={{ margin: '0 10px' }}>Created by </span>
        <GitHubIcon css={iconStyles} />
        <Link
          href="https://github.com/Androkzn"
          target="_blank"
          rel="noopener noreferrer"
          css={linkStyles}
        >
          Androkzn
        </Link>
        <span css={{ margin: '0 10px' }}>for</span>
        <Link
          href="https://www.shopify.com/"
          target="_blank"
          rel="noopener noreferrer"
          css={linkStyles}
        >
          Shopify
        </Link>
      </div>
    </div>
  );
};

export default memo(Footer);
