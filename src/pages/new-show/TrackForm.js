import React from 'react';
import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from './StyledComponents';

const TrackForm = ({ track, setTrack }) => {
  return (
    <Input
      value={track.id}
      onChange={(event) => { setTrack(event.target.value) }}
      placeholder={"Song Title"} />
  )
}

export default TrackForm;