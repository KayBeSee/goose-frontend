import React from 'react';
import styled from 'styled-components';


export const RelistenLogo = ({ relisten }) => {
  const formattedRelisten = relisten && relisten.replace(/-/g, '/');
  return (
    <RelistenLink
      target="_blank"
      href={`https://relisten.net/goose/${formattedRelisten}`}
      active={relisten}>
      <RelistenImage active={relisten} src={require('../../assets/relisten_app_icon.png')} />
    </RelistenLink>
  )
}

const RelistenLink = styled.a`
  pointer-events: ${props => props.active ? 'auto' : 'none'}
`;

const RelistenImage = styled.img`
  width: 24px;
  height: 24px;
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;