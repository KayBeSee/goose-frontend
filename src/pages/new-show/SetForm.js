
import React from 'react';
import styled from 'styled-components';
import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from './StyledComponents';
import TrackForm from './TrackForm';

const SetForm = ({ set, setSet }) => {

  const setTrack = (track, index) => {
    const updatedSet = set;
    updatedSet.tracks[index] = track;

    setSet(updatedSet)
  }

  const addTrack = () => {
    const updatedSet = set;
    updatedSet.tracks.push('');
    setSet(updatedSet);
  }

  return (
    <FormSection>
      <FormSectionHeader>{set.name.replace('_', ' ')}</FormSectionHeader>
        <AddTrackButton type="button" onClick={addTrack}>Add Track</AddTrackButton>
        {set.tracks.map((track, index) => (
          <TrackForm 
            track={track}
            setTrack={(track) => setTrack(track, index)}
          />
        ))}
    </FormSection>
  )
};

const AddTrackButton = styled.button``;

export default SetForm;