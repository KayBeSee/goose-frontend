import React from 'react';
import styled from 'styled-components';


export const ArchiveLogo = ({ active, src }) =>  (
  <ArchiveImage active={active} src={require('../../assets/archiveorg_logo.png')} />
);

const ArchiveImage = styled.img`
  width: 20px;
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;