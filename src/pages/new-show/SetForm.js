
import React from 'react';
import styled, { css } from 'styled-components';
import { FormSection, FormSectionHeader, ActualForm } from './StyledComponents';
import TrackForm from './TrackForm';
import { mobile } from '../../utils/media';
import { darkOffWhite, orange, offWhite } from '../../utils/colors';

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
    <FormSectionModified>
      <FormSectionHeaderModified>{set.name.replace('_', ' ')}</FormSectionHeaderModified>
      <ActualFormPadding>
        {set.tracks.map((track, index) => (
          <TrackForm
            key={index}
            index={index}
            track={track}
            setTrack={(track) => setTrack(track, index)}
          />
        ))}
        <AddTrackButton type="button" onClick={() => addTrack()}>Add Track</AddTrackButton>
      </ActualFormPadding>
    </FormSectionModified>
  )
};

const FormSectionModified = styled(FormSection)`
  background: ${offWhite};
  border: 1px solid ${darkOffWhite};
  margin: 24px -24px;
  position: relative;
  flex: 1 0 200px;
`;

const FormSectionHeaderModified = styled(FormSectionHeader)`
  flex: 1 0 200px;
`;

const ActualFormPadding = styled(ActualForm)`
  margin: 0 48px;
  flex: 2;
  ${mobile(css`
    margin: 0;
  `)};
`;

const AddTrackButton = styled.button`
  padding: 16px;
  background: #fff;
  color: ${orange};
  border: none;
  border-radius: 4px;
  border: 1px solid ${orange};
  font-size: 16px;
  margin-top: 24px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }

  &:active, &:focus {
    outline: 0;
  }
`;

export default SetForm;