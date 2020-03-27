import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { black, white, offWhite, orange } from '../../utils/colors';

import VideoIdForm from './VideoIdForm';
import TracksForm from './TracksForm';

const PAGE_SIZE = 500;

const CREATE_NEW_VIDEO = gql`
  mutation createVideo($videoId: String!, $tracks: TrackCreateManyWithoutVideosInput) {
    createVideo(data: {
      videoId: $videoId,
      tracks: $tracks
    }) {
      id
      videoId
      tracks {
        id
        song {
          id
          name
        }
      }
    }
  }
`;

const SHOWS = gql`
 query getShows($first: Int!, $skip: Int!) {
    shows(
      first: $first,
      skip: $skip,
      orderBy: date_DESC
    ) {
      id
      date
      eventName
      venue {
        id
        name
        city
        state
      }
      setlist {
        id
        name
        tracks {
          id
          notes
          segue
          song {
            id
            name
            notes
          }
        }
      }
      nugsNetId
      bandcampAlbumId
    }
  }
`;

const undefinedVideo = {
  videoId: undefined,
  tracks: []
}

const buildTracksQueryString = (tracks) => {
  return `{ "connect": [
        ${tracks.map((track) => (`
          {
            "id": "${track}"
          }
        `))}
      ]
    }`;
}

const NewVideo = (props) => {
  document.title = "New Video - El Göose";
  const { loading: showLoading, error: showError, data: shows } = useQuery(SHOWS, { variables: { first: PAGE_SIZE, skip: 0 * PAGE_SIZE } })
  const [createNewVideo, { loading: videoLoading, error: videoError }] = useMutation(CREATE_NEW_VIDEO);
  const [currentStep, setStep] = useState(0);

  // KBC-TODO: add error and loading set for creating new video

  const [videoId, setVideoId] = useState(undefinedVideo.videoId);
  const [tracks, setTracks] = useState(undefinedVideo.tracks);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const tracksQueryString = buildTracksQueryString(tracks);
    const tracksQueryObject = JSON.parse(tracksQueryString);

    const { data, error } = await createNewVideo({ variables: { videoId, tracks: tracksQueryObject } });
    if (!error && data) {
      // KBC-TODO: this should redirect to the video page or refresh to add another video
      console.log('data: ', data);
      // history.push(`shows/${data.createShow.id}`);
    }
  }

  if (showLoading) return <p>Loading...</p>;
  if (showError) return <p>Error :(</p>;

  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          Add a New Video
          </BandDateWrapper>
      </BandDateContainer>
      <FormContainer>
        <NewVideoContainer>
          <NewVideoForm>

            {currentStep === 0 && <VideoIdForm videoId={videoId} setVideoId={setVideoId} />}

            {currentStep === 1 && <TracksForm tracks={tracks} setTracks={setTracks} shows={shows.shows} />}
            <SignupButton
              type="button"
              onClick={(e) => {
                e.preventDefault()
                if (currentStep === 1) {
                  handleSubmit(e);
                } else {
                  setStep(currentStep + 1);
                }
              }}>
              {currentStep === 0 ? 'Tag Tracks' : 'Save Video'}
            </SignupButton>
          </NewVideoForm>
        </NewVideoContainer>
      </FormContainer>
    </Wrapper >
  )
}

const Wrapper = styled.div`
max-width: 750px;
width: 100%;
margin-bottom: 24px;
text-align: left;
color: ${ black};
min-height: 340px;

// background: ${offWhite};
//   width: 100%;
//   text-align: left;
//   font-family: 'Montserrat', sans-serif;
//   color: ${black};
//   display: flex;
//   flex: 1;
//   justify-content: center;
//   flex-direction: column;
`;

const BandDateContainer = styled.div`
border-top: 4px solid ${orange};
display: flex;
margin-bottom: 24px;
justify-content: space-between;
// align-items: center;
max-width: 750px;
// margin-top: -6px;  
// justify-self: center;
// align-self: center;
`;

const BandDateWrapper = styled.span`
  background: ${ orange};
  padding: 12px;
  color: ${ white};
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0, 0 %, 0 %, 0.15);
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: ${offWhite};
  transition: height .5s ease-in-out;
`;

const NewVideoContainer = styled.div`
  background: ${ white};
  box-shadow: 0 1px 46px 4px rgba(0, 0, 0, .28);
  max-width: 750px;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 18px;
  border-radius: 4px;
  min-height: 340px;
`;

const NewVideoForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  border-radius: 0 0 4px 4px;
  position: relative;

  > div {
    flex: 1;
  }
`;

const SignupButton = styled.button`
  padding: 16px;
  background: ${ orange};
  color: #fff;
  border: none;
  border-radius: 0 0 4px 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  margin: 0;

    &: hover {
    cursor: pointer;
  }

    &: active, &: focus {
    outline: 0;
    background: #e5634c;
  }
`;

export default NewVideo;