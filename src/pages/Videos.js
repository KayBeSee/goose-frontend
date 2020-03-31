import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { mobile } from '../utils/media';
import { orange, darkOrange, gray, darkGray, offWhite, black } from '../utils/colors';

import { MainVideo, OtherVideos } from '../components/video';

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
                videos {
                  id
                  videoId
                }
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

const Videos = () => {
  const { loading, error, data } = useQuery(VIDEOS, { variables: { skip: 0 } });
  const [selectedVideo, setSelectedVideo] = useState();

  if (loading) { return <p>Loading...</p> }
  if (error) { return <p>Error...</p> }
  const videos = data.videos;

  if (!selectedVideo) {
    setSelectedVideo(videos[0]);
  }

  if (selectedVideo) {
    return (
      <VideosContainer>
        <BandDateWrapper>
          Videos
        </BandDateWrapper>
        <MainVideo video={selectedVideo} />
        <OtherVideos videos={videos} ignore={selectedVideo} setSelectedVideo={setSelectedVideo} />
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
      
  ${mobile(css`
    margin-top: 0px;
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