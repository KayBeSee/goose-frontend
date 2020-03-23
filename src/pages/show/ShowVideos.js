import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import YouTube from 'react-youtube';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import { mobile } from '../../utils/media';
import { darkOffWhite, orange, offWhite } from '../../utils/colors';

import ShowSetlist from './ShowSetlist';

momentDurationFormatSetup(moment);

const VideoPlaylistItem = ({ videoId, setSelectedVideo, setSelectedVideoTitle }) => {
  const [videoTitle, setVideoTitle] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);

  const _onYTReadyPlaylist = (event) => {
    const videoData = event.target.getVideoData();
    setVideoTitle(videoData.title);
    const duration = event.target.getDuration();
    setVideoDuration(duration);
  }

  return (
    <VideoContainer
      onClick={() => {
        setSelectedVideo(videoId);
        setSelectedVideoTitle(videoTitle);
      }}
      className="foo">
      <PlaylistYouTubeVideo
        // className="yt-playlist-video"
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
        onReady={_onYTReadyPlaylist}
      />
      <VideoInfo>
        <PlaylistVideoTitle>{videoTitle}</PlaylistVideoTitle>

        <div>{videoDuration && moment.duration(videoDuration, 'seconds').format("hh:mm:ss")}</div>
      </VideoInfo>
    </VideoContainer>
  )
}

const getVideosFromSetlist = (setlist) => {
  const videos = [];
  const videoIds = setlist.reduce((videoIdArray, set) => {
    return videoIdArray.concat(set.tracks.reduce((trackAccume, track) => {
      return trackAccume.concat(track.videos.reduce((videoAccume, video) => {
        if (!trackAccume.includes(video.videoId) && !videoIdArray.includes(video.videoId)) {
          videos.push(video);
          return videoAccume.concat(video.videoId);
        }
        return videoAccume;
      }, []));
    }, []));
  }, []);
  return videos;
}

const getTrackIdsFromVideo = (video) => {
  const trackIds = [];
  video && video.tracks.forEach((track) => {
    trackIds.push(track.id);
  });
  return trackIds;
}

const getVideoByVideoId = (videoId, videos) => {
  let selectedVideo = null;
  videos.forEach((video) => {
    if (video.videoId === videoId) {
      selectedVideo = video;
    }
  })
  return selectedVideo;
}

const ShowVideos = ({ videosIds, show }) => {
  const [selectedVideo, setSelectedVideo] = useState(videosIds[0]);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);

  const _onYTReady = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    const videoData = event.target.getVideoData();
    setSelectedVideoTitle(videoData.title);
  }

  const videos = getVideosFromSetlist(show.setlist);
  const selectedTrackIds = getTrackIdsFromVideo(getVideoByVideoId(selectedVideo, videos));

  return (
    <VideosContainer>
      <SetlistWrapper>
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
        <h2 style={{ margin: '0 12px' }}>{selectedVideoTitle}</h2>
        <ShowSetlist show={show} boxShadow='none' margin='0' selectedVideos={selectedTrackIds} />
      </SetlistWrapper>



      <OtherVideosOuter>
        <h2 style={{ margin: '0 12px' }}>More videos from this show</h2>
        <OtherVideosInner>
          {videosIds.map((videoId) => {
            if (videoId !== selectedVideo) {
              return <VideoPlaylistItem videoId={videoId} setSelectedVideo={setSelectedVideo} setSelectedVideoTitle={setSelectedVideoTitle} />
            }
          })}
        </OtherVideosInner>
      </OtherVideosOuter>
    </VideosContainer>
  )
}

const MainYouTubeVideo = styled(YouTube)`
      width: 100%;
      margin-bottom: 24px;
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

const SetlistWrapper = styled.div`
    // padding: 12px 12px;
    border-radius: 4px;
    line-height: 1.5;
    background: #fff;
    margin: 24px 0;
    box-shadow: 0 5px 15px 0 hsla(0, 0%, 0%, 0.15);
    border-radius: 4px;
`;

const PlaylistVideoTitle = styled.div`
  font-size: 18px;
`;

const OtherVideosInner = styled.div`
      max-height: 400px;
      // overflow: scroll;
      display: flex;
      flex-direction: column;
  border-top: 1px solid ${darkOffWhite};
      padding: 10px 0;
    `;

const VideoContainer = styled.div`
      z-index: 5;
      display: flex;
      padding: 24px 12px;
      flex-wrap: wrap;
      width: 100%;
    `;

const VideoInfo = styled.div`
      flex: 1 0 250px;
      padding: 24px;

      ${mobile(css`
        margin-bottom: 24px;
        padding: 24px 0;
      `)};
    `;

export default ShowVideos;