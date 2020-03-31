import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import { orange, darkOrange, gray, darkGray } from '../../utils/colors';

import { MainVideo, OtherVideos } from '../../components/video';

momentDurationFormatSetup(moment);

const ShowVideos = ({ videos, show }) => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  if (selectedVideo) {
    return (
      <VideosContainer>
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
            <MoonCabinImage src={require("../../assets/moon_cabin.png")} />
          </div>
        </MoonCabinImageContainer>
      </UnavailableContainer>
    )
  }
}

const VideosContainer = styled.div`

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

export default ShowVideos;