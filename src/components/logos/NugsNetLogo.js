import React from 'react';
import styled from 'styled-components';

export const NugsNetLogo = ({ nugsNetId }) => (
  <NugsNetLink
    target="_blank"
    href={`nugsnet://show?id=${nugsNetId}`}
    active={nugsNetId}>
    <NugsNetImage active={nugsNetId} src={require('../../assets/nugs_logo.png')} />
  </NugsNetLink>
);

const NugsNetLink = styled.a`
  pointer-events: ${props => props.active ? 'auto' : 'none'}
`;

const NugsNetImage = styled.img`
  width: 24px;
  height: 24px;
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;