import React from 'react';
import styled from 'styled-components';

import { Input } from './StyledComponents';

const TrackForm = ({ track, setTrack }) => {
  return (
    <InputModified
      value={track.id}
      onChange={(event) => { setTrack(event.target.value) }}
      placeholder={"Song Title"} />
  )
}

const InputModified = styled(Input)`
  margin: 8px 0;
`;

export default TrackForm;