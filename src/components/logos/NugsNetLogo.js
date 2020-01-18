import React from 'react';
import styled from 'styled-components';

export const NugsNetLogo = ({ active }) => (
    <NugsNetImage active={active} src={require('../../assets/nugs_logo.png')} />
);

const NugsNetImage = styled.img`
  width: 24px;
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;