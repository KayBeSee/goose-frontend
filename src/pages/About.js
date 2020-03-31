import React from 'react';
import styled from 'styled-components';
import { offWhite, orange } from '../utils/colors';

const About = () => {
  document.title = "El Göose - Goose Setlists, Song Information, and History";
  return (
    <Wrapper>
      <Container>
        <h1>The Goose is Loose!</h1>

        <p style={{ color: orange }}>/ /</p>

        <p>Welcome to El Göose!</p>

        <p>This site contains a database and historical record of all things related to the band Goose. It is best enjoyed in a foreign place with an ice-cold mojito.</p>

        <p>This is very much a work in progress, so if you have any suggestions for features to add to the site, have setlist/song data that isn't on here, or see any errors, please email me at <EmailLink href="mailto:kaybesee@gmail.com">KayBeSee@gmail.com</EmailLink></p>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #222;
  width: 100%;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${offWhite};
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
    max-width: 750px;
    padding: 24px;
`;

const EmailLink = styled.a`
  color: #fff;
  text-decoration: underline;
`;

export default About;