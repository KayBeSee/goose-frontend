import React from 'react';
import styled from 'styled-components';

import { darkOffWhite } from '../../utils/colors';

import { VideoPlaylistItem } from './VideoPlaylistItem';

export const OtherVideos = ({ videos, ignore, setSelectedVideo }) => {

  return (
    videos.length > 1 && (
      <OtherVideosOuter>
        <h2 style={{ margin: '24px 12px' }}>More videos</h2>
        <OtherVideosInner>
          {videos.map((video) => {
            if (video.videoId !== ignore) {
              return <VideoPlaylistItem video={video} setSelectedVideo={setSelectedVideo} />
            }
          })}
        </OtherVideosInner>
      </OtherVideosOuter>
    )
  )
}

const OtherVideosOuter = styled.div`
  padding: 12px 0;
`;

const OtherVideosInner = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${darkOffWhite};
  padding: 10px 0;
`;