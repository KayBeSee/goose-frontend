import React from 'react';
import styled from 'styled-components';


export const ArchiveLogo = ({ archiveUrl }) =>  (
  <ArchiveLink
    target="_blank" 
    href={`https://archive.org/details/${archiveUrl}`}
    active={archiveUrl}>
    <ArchiveImage active={archiveUrl} src={require('../../assets/archiveorg_logo.png')} />
  </ArchiveLink>
);

const ArchiveLink = styled.a`
  pointer-events: ${props => props.active ? 'auto' : 'none'}
`;

const ArchiveImage = styled.img`
  width: 20px;
  height: 20px;
  opacity: ${props => !!props.archiveUrl ? 0.95 : 0.25}
`;