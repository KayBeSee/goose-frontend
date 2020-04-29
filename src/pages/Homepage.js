import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

import { mobile } from '../utils/media';
import { darkOffWhite, offWhite, orange, black, white } from '../utils/colors';

const Homepage = () => {
  document.title = "El Göose - Goose Setlists, Song Information, and History";
  return (
    <Wrapper>
      <BandDateWrapper>
        <ShowDateWrapper>Welcome to El Göose!</ShowDateWrapper>
      </BandDateWrapper>

      <Container style={{ padding: 24, borderBottom: '1px solid #e4e9f1' }}>El Göose is an online archive for all things related to the band Goose. We are constantly adding new audio streams, video content, and live stream updates, so check back!!</Container>

      <Container>
        <UpdateItem>
          <UpdateItemHeader>
            <UpdateItemHeaderText>
              New video
            </UpdateItemHeaderText>
          </UpdateItemHeader>
          <UpdateItemContent>
            Thanks for tuning in — Chicago is now up on nugs + bandcamp!! <br />
            <br />
            Nugs: 2nu.gs/2WSwBNq <br />
            Bandcamp: bit.ly/39wdyLo

          </UpdateItemContent>
          <UpdateItemImageContainer>
            <UpdateItemImage src={require('../assets/alive-and-well.jpeg')} />
          </UpdateItemImageContainer>
          <UpdateMetaData>
            Posted {moment('3/30/2020').fromNow()}
          </UpdateMetaData>
        </UpdateItem>

        <UpdateItem>
          <UpdateItemHeader>
            <UpdateItemHeaderText>
              Live stream premiere tonight!!
            </UpdateItemHeaderText>
          </UpdateItemHeader>
          <UpdateItemContent>
            Tonight at 8:45PM ET we relive our most recent Chicago show and debut at the Riv! pre-order now: bit.ly/2WQf08M
          </UpdateItemContent>
          <UpdateItemImageContainer>
            <UpdateItemImage src={require('../assets/grand-rapids.jpeg')} />
          </UpdateItemImageContainer>
          <UpdateMetaData>
            Posted {moment('3/29/2020').fromNow()}
          </UpdateMetaData>
        </UpdateItem>

        <UpdateItem>
          <UpdateItemHeader>
            <UpdateItemHeaderText>
              New video
            </UpdateItemHeaderText>
          </UpdateItemHeader>
          <UpdateItemContent>
            Let’s do this thang!! Live from T’s house in 30 minutes — tune in: bit.ly/3auDp80
          </UpdateItemContent>
          <UpdateItemImageContainer>
            <UpdateItemImage src={require('../assets/chicago.jpeg')} />
          </UpdateItemImageContainer>
          <UpdateMetaData>
            Posted {moment('3/28/2020').fromNow()}
          </UpdateMetaData>
        </UpdateItem>
      </Container>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  background: ${offWhite};
      max-width: 750px;
      width: 100%;
      margin-bottom: 24px;
      text-align: left;
  color: ${black};
      margin: 0 12px;
    `;

const ShowDateWrapper = styled.div`
      font-weight: 500;
      font-size: 36px;
    
  ${mobile(css`
    font-size: 24px;
  `)};
    `;

const Container = styled.div`
  max-width: 750px;
`;

const BandDateWrapper = styled.div`
  display: inline-block;
  background: ${orange};
  padding: 8px;
  color: #ffffff;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
  margin-top: -16px;

  ${mobile(css`
    font-size: 24px;
    margin-top: 0px;
  `)};
`;

const UpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 4px solid ${orange};
  margin: 64px 0 24px;
  background: ${white};
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const UpdateItemHeader = styled.div`
  display: inline-block;
  margin-top: -16px;
`;

const UpdateItemHeaderText = styled.span`
  background: ${orange};
  padding: 8px;
  color: ${white};
  font-weight: 500;
  font-size: 36px;

  ${mobile(css`
    font-size: 24px;
  `)};
`;

const UpdateItemContent = styled.div`
  padding: 24px;
`;

const UpdateMetaData = styled.div`
  padding: 8px 12px;
  border-top: 1px solid ${darkOffWhite};
  font-size: 12px;
`;

const UpdateItemImageContainer = styled.div`
  display: flex;
`;

const UpdateItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default Homepage;