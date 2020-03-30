import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import YouTube from 'react-youtube';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import { mobile } from '../../utils/media';
import { orange, darkOrange, gray, darkGray, darkOffWhite } from '../../utils/colors';

import Setlist from '../show/Setlist';

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

  const setPageToTop = () => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    });
  }

  return (
    <VideoContainer
      onClick={() => {
        setSelectedVideo(videoId);
        setSelectedVideoTitle(videoTitle);
        setPageToTop();
      }}>
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

        <div>Duration: {videoDuration && moment.duration(videoDuration, 'seconds').format("hh:mm:ss")}</div>
      </VideoInfo>
    </VideoContainer>
  )
}

const getVideosFromSong = (song) => {
  const videos = {};
  song.tracks.reduce((videoIdArray, track) => {
    return videoIdArray.concat(track.videos.reduce((trackAccume, video) => {
      console.log('getVideosFromSong video: ', video)
      if (!trackAccume.includes(video.videoId) && !videoIdArray.includes(video.videoId)) {
        videos[video.videoId] = video;
        return trackAccume.concat(video.videoId);
      }
      return trackAccume;
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
  Object.keys(videos).forEach((currentVideoId) => {
    if (videos[currentVideoId].videoId === videoId) {
      selectedVideo = videos[currentVideoId];
    }
  })
  return selectedVideo;
}

const SongVideos = ({ videosIds, song }) => {
  console.log('song: ', song);
  const [selectedVideo, setSelectedVideo] = useState(videosIds[0]);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);

  const _onYTReady = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    const videoData = event.target.getVideoData();
    setSelectedVideoTitle(videoData.title);
  }

  // const videos = getVideosFromSetlist(song.setlist);
  const videos = getVideosFromSong(song);
  console.log('SongVideos videos: ', videos);
  const selectedTrackIds = getTrackIdsFromVideo(getVideoByVideoId(selectedVideo, videos));

  console.log('selectedTrackIds: ', selectedTrackIds);

  if (selectedVideo) {
    return (
      <VideosContainer>
        <SetlistWrapper>
          <MainYouTubeVideo
            className="yt-playlist-video"
            videoId={selectedVideo}
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
          />
          <h2 style={{ margin: '0 24px' }}>{selectedVideoTitle}</h2>
          <Setlist show={videos[selectedVideo].tracks[0].set.show} boxShadow='none' margin='0' selectedVideos={selectedTrackIds} />
        </SetlistWrapper>



        {Object.keys(videos).length > 1 && (
          <OtherVideosOuter>
            <h2 style={{ margin: '24px 12px' }}>More videos of {song.name}</h2>
            <OtherVideosInner>
              {Object.keys(videos).map((videoId) => {
                if (videoId !== selectedVideo) {
                  return <VideoPlaylistItem videoId={videoId} setSelectedVideo={setSelectedVideo} setSelectedVideoTitle={setSelectedVideoTitle} />
                }
              })}
            </OtherVideosInner>
          </OtherVideosOuter>
        )}
      </VideosContainer>
    )
  } else {
    return (
      <UnavailableContainer>
        <UnavailableTextContainer>
          <h2>Video Unavailable</h2>

          <h5>No video has been released for this show...yet. Click follow or I was there to get notified if any content gets added later.</h5>
          <FollowButton>Follow Show</FollowButton>
        </UnavailableTextContainer>
        <MoonCabinImageContainer>
          <div style={{ maxWidth: 250, maxHeight: 250, padding: 12 }}>
            <MoonCabinImage src={require("../../assets/moon_cabin.png")} />
          </div>
        </MoonCabinImageContainer>
      </UnavailableContainer>
    )
  }
}

const MainYouTubeVideo = styled(YouTube)`
  width: 100%;
  margin-bottom: 24px;
  background: #000;
`;

const PlaylistYouTubeVideo = styled(YouTube)`
  flex: 1 0 100px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: #000;
`;

const VideosContainer = styled.div`

`;

const OtherVideosOuter = styled.div`
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
  margin-bottom: 12px;
`;

const OtherVideosInner = styled.div`
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
  padding: 24px;

  ${mobile(css`
    margin-bottom: 24px;
    // padding: 24px 0;
  `)};
`;

const Container = styled.div`
  padding: 24px;
  border-radius: 4px;
  line-height: 1.5;
  background: #fff;
  margin: 24px 0;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
  border-radius: 4px;
`;

const UnavailableContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`;

const UnavailableTextContainer = styled.div`
  flex: 2 1 300px;
`;

const MoonCabinImageContainer = styled.div`
  display: flex;
  flex: 1 0 200px;
  justify-content: center;
`;

const MoonCabinImage = styled.img`
  width: 100%;
  height: auto;
`;

const FollowButton = styled.button`
  padding: 16px;
  background: ${props => props.active ? orange : gray};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  outline: 0;

  &:hover {
    cursor: pointer;
  }

  &:active {
    outline: 0;
    background: ${props => props.active ? darkOrange : darkGray};
  }

  &:focus {
    outline: 0;
  }
`;

export default SongVideos;