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
            <UpdateItemImage src={'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/p843x403/91782824_2748760135345154_5912107394447441920_o.jpg?_nc_cat=107&_nc_sid=8bfeb9&_nc_ohc=ZaN4oDo-sUwAX89Xvyd&_nc_ht=scontent-ort2-2.xx&_nc_tp=6&oh=4fff1b2afaf03cf7cfa33de3a3154c1c&oe=5EA7CC47'} />
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
            <UpdateItemImage src={'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/91406787_2748534538701047_4179746637846937600_o.jpg?_nc_cat=108&_nc_sid=730e14&_nc_ohc=ir1K9VqXcdEAX8wtEZ7&_nc_ht=scontent-ort2-2.xx&oh=423098e4a4f4e9810aa191eb6d1ce79b&oe=5EA6BD33'} />
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
            <UpdateItemImage src={'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/91013180_2746699618884539_8984740351059165184_o.jpg?_nc_cat=104&_nc_sid=730e14&_nc_ohc=lwo6wphAL3YAX-Hesw0&_nc_ht=scontent-ort2-2.xx&oh=46caf8b87d62ca08e87463bc0ac54386&oe=5EA99C56'} />
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