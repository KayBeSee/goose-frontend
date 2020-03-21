
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { mobile } from '../../utils/media';
import { darkOffWhite, orange, offWhite, white } from '../../utils/colors';

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from '../../components/FormComponents';

import ShowRow from './ShowRow';

const TracksForm = ({ shows, tracks, setTracks }) => {

  const toggleTrack = (trackId) => {
    let modifiedTracksArray = [...tracks];
    if (tracks.includes(trackId)) {
      modifiedTracksArray.splice(tracks.indexOf(trackId), 1);
    } else {
      modifiedTracksArray.push(trackId);
    }
    setTracks(modifiedTracksArray);
  }

  const clearAllTracks = () => {
    setTracks([]);
  }

  const selectAllTracks = (show) => {
    const allTrackIds = show.setlist.reduce((setAccume, set) => {
      return setAccume.concat(set.tracks.reduce((trackAccume, track) => {
        return trackAccume.concat(track.id)
      }, []));
    }, []);
    setTracks(allTrackIds);
  }

  console.log('TracksForm tracks: ', tracks);

  return (
    <ShowContainer>
      <FormSectionModified>
        <FormExplainer style={{ flex: 'auto' }}>
          <FormSectionHeader>
            Select Tracks
        </FormSectionHeader>
          <FormSectionSubtext>
            Here is some explainer text about the section. Yada, yada, yada...
          </FormSectionSubtext>
        </FormExplainer>
        <ActualFormModified>
          {shows.map((show, index) => (
            <ShowRow
              show={show}
              odd={index % 2}
              tracks={tracks}
              toggleTrack={toggleTrack}
              selectAllTracks={selectAllTracks}
              clearAllTracks={clearAllTracks}
            />
          ))}

        </ActualFormModified>
      </FormSectionModified>
    </ShowContainer>
  )
};

const ShowContainer = styled.div`
  overflow: hidden;
`;

const FormSectionModified = styled(FormSection)`
  overflow: hidden;
  flex-direction: column;
  flex: 0;
  display: 'block';
`;

const ActualFormModified = styled(ActualForm)`
  overflow: scroll;
  border: 1px solid ${darkOffWhite};
  display: block;
  min-height: 400px;
`;

export default TracksForm;