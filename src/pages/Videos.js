import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import YouTube from 'react-youtube';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { mobile } from '../utils/media';
import { orange, darkOrange, gray, darkGray, darkOffWhite, offWhite, black } from '../utils/colors';

import Setlist from './show/Setlist';

momentDurationFormatSetup(moment);

const VIDEOS = gql`
  query getVideos($skip: Int!) {
    videos(
      skip: $skip,
      orderBy: id_ASC
    ) {
      id
      videoId
      tracks {
        id
        song {
          id
          name
        }
        set {
          id
          name
          show {
            id
            date
            venue {
              id
              name
            }
            setlist {
              id
              name
              tracks {
                id
                song {
                  id
                  name
                }
              }
            }
          }
          tracks {
            id
            song {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const VideoPlaylistItem = ({ video, setSelectedVideo, setSelectedVideoTitle }) => {
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
        setSelectedVideo(video);
        setSelectedVideoTitle(videoTitle);
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

const Videos = ({ videosIds }) => {
  console.log('videosIds: ', videosIds);
  const { loading, error, data } = useQuery(VIDEOS, { variables: { skip: 0 } });


  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);

  if (loading) { return <p>Loading...</p> }
  if (error) { return <p>Error...</p> }
  const videos = data.videos;
  console.log('oading, error, data: ', selectedVideo, loading, error, data)

  const _onYTReady = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    const videoData = event.target.getVideoData();
    setSelectedVideoTitle(videoData.title);
  }

  // const videos = getVideosFromSetlist(song.setlist);
  // const videos = getVideosFromSong(song);
  if (!selectedVideo) {
    setSelectedVideo(videos[0]);
  }

  const selectedTrackIds = getTrackIdsFromVideo(getVideoByVideoId(selectedVideo, videos));
  console.log('selectedTrackIds: ', selectedTrackIds);

  if (selectedVideo) {
    return (
      <VideosContainer>
        <BandDateWrapper>
          Videos
        </BandDateWrapper>
        <SetlistWrapper>
          <MainYouTubeVideo
            className="yt-playlist-video"
            videoId={selectedVideo.videoId}
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
          <Setlist show={selectedVideo.tracks[0].set.show} boxShadow='none' margin='0' selectedVideos={selectedTrackIds} />
        </SetlistWrapper>



        {videos.length > 1 && (
          <OtherVideosOuter>
            <h2 style={{ margin: '24px 12px' }}>More videos</h2>
            <OtherVideosInner>
              {videos.map((video) => {
                if (video.videoId !== selectedVideo) {
                  return <VideoPlaylistItem video={video} setSelectedVideo={setSelectedVideo} setSelectedVideoTitle={setSelectedVideoTitle} />
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
            <MoonCabinImage src={require("../assets/moon_cabin.png")} />
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
  background: ${offWhite};
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  color: ${black};
`;

export const BandDateWrapper = styled.span`
	background: ${orange};
	padding: 12px;
	color: #ffffff;
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
  margin-top: -16px;
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
  padding: 0 24px;

  ${mobile(css`
    margin-bottom: 24px;
    padding: 24px 12px;
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

export default Videos;