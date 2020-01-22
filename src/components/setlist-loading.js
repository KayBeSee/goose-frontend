import React from 'react';
import styled from 'styled-components';
import AttendanceButton from './attendance-button';

import { GrayLoadingAnimation, OrangeLoadingAnimation } from './Loading';

const Setlist = ({ loading, show, includeNotes = true }) => {  
  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          <OrangeLoadingAnimation style={{ height: 24, width: 150 }} />
        </BandDateWrapper>
      </BandDateContainer>
      <ShowDataBody>
        <VenueInfoContainer>
          <GrayLoadingAnimation style={{ width: 250, height: 48, marginBottom: 12, marginTop: 12 }} />
          <GrayLoadingAnimation style={{ width: 250, height: 24 }} />
        </VenueInfoContainer>
        <AttendanceButtonContainer>
          <AttendanceButton showId={null} />
        </AttendanceButtonContainer>
      </ShowDataBody>
      <SetlistWrapper>
        <SetWrapper>
          <TrackWrapper>
            <GrayLoadingAnimation />
            <GrayLoadingAnimation style={{ marginTop: 24 }}/>
            <GrayLoadingAnimation style={{ marginTop: 24 }}/>
          </TrackWrapper>
        </SetWrapper>
      </SetlistWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #fff;
  margin: 48px 0;
  box-shadow: 0 5px 15px 0 hsla(0, 0%, 0%, 0.15);
  border-radius: 4px;

`;

const BandDateContainer = styled.div`
	border-top: 4px solid #ff6f55;
	display: flex;
`;

const ShowDataBody = styled.div`
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
`;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 8px;
	color: #ffffff;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
`;

const VenueInfoContainer = styled.div``;
const AttendanceButtonContainer = styled.div``;

const SetlistWrapper = styled.div`
  padding: 12px 12px;
	border-radius: 4px;
`;

const SetWrapper = styled.div`
	padding: 16px 0;
`;

const TrackWrapper = styled.span``;

export default Setlist;