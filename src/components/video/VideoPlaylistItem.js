import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import YouTube from 'react-youtube';

import { mobile } from '../../utils/media';

export const VideoPlaylistItem = ({ video, setSelectedVideo }) => {
  const [videoDuration, setVideoDuration] = useState(null);

  const _onYTReadyPlaylist = (event) => {
    // const videoData = event.target.getVideoData();
    const duration = event.target.getDuration();
    setVideoDuration(duration);
  }

  const setPageToTop = () => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    });
  }

  return (
    <VideoContainer
      onClick={() => {
        setSelectedVideo(video);
        setPageToTop();
      }}>
      <PlaylistYouTubeVideo
        // className="yt-playlist-video"
        videoId={`${video.videoId}?mode=opaque`}
        opts={{
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0
          }
        }}
        showinfo={0}
        onReady={_onYTReadyPlaylist}
      />
      <VideoInfo>
        <PlaylistVideoDate>{moment(video.tracks[0].set.show.date).format('MM/DD/YYYY')}</PlaylistVideoDate>
        <PlaylistVideoVenueName>{video.tracks[0].set.show.venue.name}</PlaylistVideoVenueName>

        <PlaylistVideoTracks>
          {video.tracks.map((track, index) => {
            return (
              <PlaylistVideoTrack>{track.song.name}{index < video.tracks.length - 1 && ','} </PlaylistVideoTrack>
            )
          })}
        </PlaylistVideoTracks>
        <PlaylistVideoDuration>Duration: {videoDuration && moment.duration(videoDuration, 'seconds').format("hh:mm:ss")}</PlaylistVideoDuration>
      </VideoInfo>
    </VideoContainer>
  )
}

const PlaylistYouTubeVideo = styled(YouTube)`
  flex: 1 0 100px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: #000;
`;

const PlaylistVideoDate = styled.div`
  font-size: 16px;
`;


const PlaylistVideoVenueName = styled.div`
  font-size: 16px;
`;

const PlaylistVideoTrack = styled.span``;

const PlaylistVideoTracks = styled.div`
  font-size: 12px;
  margin: 12px 0;
`;

const PlaylistVideoDuration = styled.div`
  font-size: 10px;
  margin-top: 12px;
`;

const VideoContainer = styled.div`
  z-index: 5;
  display: flex;
  padding: 24px 12px;
  flex-wrap: wrap;

  ${mobile(css`
    > div {
      width: 100%;
      flex: 1 0 450px;
    }
  `)};

  > div {
    flex: 1 0 250px;
  }

`;

const VideoInfo = styled.div`
  flex: 1 0 250px;
  padding: 0 24px;

  ${mobile(css`
    margin-bottom: 24px;
    padding: 24px 12px;
  `)};
`;