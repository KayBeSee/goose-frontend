
import React from 'react';
import styled, { css } from 'styled-components';
import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from './StyledComponents';
import TrackForm from './TrackForm';
import { mobile } from '../../utils/media';
import { darkOffWhite } from '../../utils/colors';

const SetForm = ({ set, setSet }) => {
  console.log('SetForm render: ', set);

  const setTrack = (track, index) => {
    const updatedSet = set;
    updatedSet.tracks[index] = track;

    setSet(updatedSet)
  }

  const addTrack = () => {
    const updatedSet = set;
    updatedSet.tracks.push('');
    console.log('addTrack updatedSet: ', updatedSet);
    setSet(updatedSet);
  }

  return (
    <FormSectionModified>
      <FormSectionHeader>{set.name.replace('_', ' ')}</FormSectionHeader>
        <ActualFormPadding>
          {set.tracks.map((track, index) => (
            <TrackForm
              key={index} 
              track={track}
              setTrack={(track) => setTrack(track, index)}
            />
            ))}
            <AddTrackButton type="button" onClick={() => addTrack()}>Add Track</AddTrackButton>
        </ActualFormPadding>
    </FormSectionModified>
  )
};

const AddTrackButton = styled.button`
  padding: 16px;
  background: #fff;
  color: #ff6f55;
  border: none;
  border-radius: 4px;
  border: 1px solid #ff6f55;
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

const ActualFormPadding = styled(ActualForm)`
  margin: 0 48px;
  ${mobile(css`
  margin: 0;
  `)};
`;

const FormSectionModified = styled(FormSection)`
  background: #F5F7FA;
  border: 2px solid ${darkOffWhite};
`;

export default SetForm;