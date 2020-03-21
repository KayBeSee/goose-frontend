import React, { useState } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

import { darkOffWhite, orange, offWhite } from '../../utils/colors';

const _onYTReady = (event) => {
  // access to player in all event handlers via event.target
  // event.target.pauseVideo();
  console.log('event.target.getVideoData() ', event.target.getVideoData());
  console.log('event.target.getVideoData()xxx ', event.target);
}

const ShowVideos = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  console.log('selectedVideo: ', selectedVideo);
  return (
    <VideosContainer>
      <MainYouTubeVideo
        className="yt-playlist-video"
        playsinline={1}
        videoId={selectedVideo}
        opts={{
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0
          }
        }}
        onReady={_onYTReady}
      />

      <OtherVideosOuter>
        <OtherVideosInner>
          {videos.map((videoId) => (
            <VideoContainer onClick={() => { console.log('videoId: ', videoId); setSelectedVideo(videoId); }}>
              <PlaylistYouTubeVideo
                className="yt-playlist-video"
                videoId={`${videoId}?mode=opaque`}
                opts={{
                  playerVars: {
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                  }
                }}
                showinfo={0}
                onReady={_onYTReady}
              />
              <VideoInfo>
                Blah blah
              </VideoInfo>
            </VideoContainer>
          ))}
        </OtherVideosInner>
      </OtherVideosOuter>
    </VideosContainer>
  )
}

const MainYouTubeVideo = styled(YouTube)`
  width: 100%;
`;

const PlaylistYouTubeVideo = styled(YouTube)`
  flex: 1 0 100px;
  width: 100%;
  height: 100%;
`;

const VideosContainer = styled.div`
  padding: 24px 0;
`;

const OtherVideosOuter = styled.div`
  // background: ${darkOffWhite};
  padding: 12px 0;
`;

const OtherVideosInner = styled.div`
  max-height: 400px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${darkOffWhite};
  padding: 10px 0;
`;

const VideoContainer = styled.div`
  z-index: 5;
  display: flex;
  padding: 24px 0;
  flex-wrap: wrap;
`;

const VideoInfo = styled.div`
  flex: 1 0 250px;
  padding: 24px;
`;

export default ShowVideos;