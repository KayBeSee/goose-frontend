import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

export const YouTubeLogo = ({ show, videoId }) => {
  return (
    <YoutubeLink
      to={{
        pathname: `/shows/${show.id}/videos`,
        state: { selectedVideo: 'ZuC8KqmJlCk' }
      }}

      active={!!videoId}
    >
      <YoutubeImage
        active={!!videoId}
        src={require('../../assets/youtube_logo.png')} />
    </YoutubeLink>
  );
}

const YoutubeLink = styled(Link)`
  pointer-events: ${props => props.active ? 'auto' : 'none'}
  `;

const YoutubeImage = styled.img`
  width: 24px;
  height: 24px;
  opacity: ${props => props.active ? 0.95 : 0.25}
`;