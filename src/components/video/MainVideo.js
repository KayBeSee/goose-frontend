import React from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import moment from 'moment';

import Setlist from '../../pages/show/Setlist';
import { getTrackIdsFromVideo } from '../../components/video';


export const MainVideo = ({ video }) => {
  const selectedTrackIds = getTrackIdsFromVideo(video);

  const _onYTReady = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    // const videoData = event.target.getVideoData();
    // event.target.seekTo(0);
    console.log('event.target: ', event.target);
  }

  return (
    <MainVideoWrapper>
      <MainYouTubeVideo
        className="yt-playlist-video"
        videoId={video.videoId}
        opts={{
          playerVars: {
            controls: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            playsinline: 1
          }
        }}
        onReady={_onYTReady}
        onStateChange={(e) => {
          if (e.target.playerInfo.playerState === 5) {
            e.target.playVideo();
            e.target.seekTo(0);
          }
        }}
      />
      <h2 style={{ margin: '0 24px' }}>{moment(video.tracks[0].set.show.date).format('MM/DD/YYYY')}</h2>
      <h3 style={{ margin: '0 24px' }}>{video.tracks[0].set.show.venue.name}</h3>
      <Setlist show={video.tracks[0].set.show} boxShadow='none' margin='0' selectedVideos={selectedTrackIds} />
    </MainVideoWrapper>
  )
}

const MainYouTubeVideo = styled(YouTube)`
  width: 100%;
  margin-bottom: 24px;
  background: #000;
`;
const MainVideoWrapper = styled.div`
  border-radius: 4px;
  line-height: 1.5;
  background: #fff;
  margin: 24px 0;
  box-shadow: 0 5px 15px 0 hsla(0, 0%, 0%, 0.15);
  border-radius: 4px;
`;