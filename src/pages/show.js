import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import { mobile } from '../utils/media';
import moment from 'moment';
import lighten from 'polished/lib/color/lighten';
import YouTube from 'react-youtube';
import Setlist from '../components/setlist';
import { black, orange, offWhite, gray } from '../utils/colors';

const SHOW = gql`
  query getShow($id: ID!) {
    show(where: {
      id: $id
    }) {
      id
      date
      venue {
        id
        name
        city
        state
      }
      setlist {
        id
        name
        tracks {
          id
          notes
          segue
          song {
            id
            name
            notes
          }
					videos {
            id
						videoId
					}
        }
      }
			archiveUrl
			nugsNetId
			bandcampAlbumId
    }
  }
`;

const Show = (props) => {
  const { loading: showLoading, error: showError, data: showData } = useQuery(SHOW, { variables: { id: props.match.params.id }})
  
  if (showLoading) return <p>Loading...</p>;
  if (showError) return <p>Error :(</p>;
  const { id, date, eventName, setlist, venue, archiveUrl, nugsNetId, bandcampAlbumId } = showData.show;
  
  document.title = `${moment(date).format('M/D/YYYY')} Goose Setlist - El Göose`;
  
  let setlistVideos = [];
  let setlistNotes = [];

  for(let i=0; i<setlist.length; i++) {
    for(let j=0; j<setlist[i].tracks.length; j++) {
      if(setlist[i].tracks[j].videos) {
        setlistVideos.push(...setlist[i].tracks[j].videos);
      }
    }
  }

  // get all videos from tracks

  const hasStream = archiveUrl || nugsNetId || bandcampAlbumId;
  
  return (
    <Wrapper key={id}>
      <ShowHeaderWrapper>
        <BandDateWrapper>
          <ShowDateWrapper>{moment(date).format('dddd M/D/YYYY')}</ShowDateWrapper>
          <BandNameWrapper>Goose</BandNameWrapper>
        </BandDateWrapper>

        <ShowLinkWrapper>
          <ShowLink active>Setlist</ShowLink>
          {/* <ShowLink>Stream</ShowLink> */}
          <ShowLink enabled={setlistVideos.length}>Videos</ShowLink>
          <ShowLink>Stats</ShowLink>
        </ShowLinkWrapper>
      </ShowHeaderWrapper>

      <VenueInfoContainer>
        <Header>{eventName ? eventName : venue.name}</Header>
        {venue.city && venue.state && <VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>}
      </VenueInfoContainer>
      
      <SetlistWrapper>
          {setlist.map(({ name, tracks }) => (
              <SetWrapper>
                <SetTitle>{name.replace('_', ' ')}: </SetTitle>
                {tracks.map(({ id, notes, song, segue, videos }, index) => {
                  return (
                    <TrackWrapper key={id}>
                      <TrackLink to={`/songs/${song.id}`}>{song.name}</TrackLink>
                      {notes && <TrackNoteAnnotation>[{setlistNotes.length}]</TrackNoteAnnotation>}
                      {segue ? ' > ' : (tracks.length -1 === index) ? ' ' : ', '}
                      
                    </TrackWrapper>
                  )
                })
              }
              </SetWrapper>
            )
          )}
  
          {!!setlistNotes.length && (
            <NotesWrapper>
              <NotesHeader>Coach's Notes</NotesHeader>
                  {setlistNotes.map((note, index) => (
                      <TrackNote>[{index+1}] {note}</TrackNote>
                  ))}
            </NotesWrapper>
          )}
        </SetlistWrapper>

      <Container>
          {hasStream && <Header>Stream / Download</Header>}
          {hasStream && (
            <StreamContainer>
              {archiveUrl && (<StreamLink 
                active={archiveUrl} 
                target="_blank" 
                href={`https://archive.org/details/${archiveUrl}`}>
                  <img 
                    src={require("../assets/internet_archive_large.png")} 
                    style={{ width: "100%", maxHeight: 100 }}
                  />
              </StreamLink>)}
              {nugsNetId && (<StreamLink 
              active={nugsNetId}
              target="_blank" 
              href={`https://play.nugs.net/#/catalog/recording/${nugsNetId}`}>
              <img 
                    src={"https://api.nugs.net/assets/nugsnet/images/shared/logo.png"} 
                    style={{ width: "100%", maxHeight: 100 }}
                  />
              </StreamLink>)}
              {bandcampAlbumId && (<StreamLink active={bandcampAlbumId} target="_blank" href={`https://goosetheband.bandcamp.com/album/${bandcampAlbumId}`}>
                <img 
                  src={require("../assets/bandcamp_logo_large.png")} 
                  style={{ width: "100%", maxHeight: 100 }}
                />
                </StreamLink>)}
            </StreamContainer>
          )}
      </Container>
      {/* <Container>
        <Header>Videos</Header>
					{setlistVideos.map((video, index) => {
						return <YouTube key={index} videoId={video.videoId} />
					})}
      </Container>
      <Container>
        <Header>Comments</Header>
      </Container> */}
    </Wrapper>
  );
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

const ShowHeaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BandDateWrapper = styled.div`
  display: inline-block;
	background: #ff6f55;
	padding: 8px;
	color: #ffffff;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
`;

const ShowDateWrapper = styled.div`
  font-weight: 700;
  font-size: 36px;
`;

const BandNameWrapper = styled.div`
  font-size: 16px;
`;

const ShowLinkWrapper = styled.div`
  display: inline-flex;

  ${mobile(css`
    margin-top: 24px;
  `)};
`;

export const ShowLink = styled(Link)`
  color: ${props => props.active ? orange : props.enabled ? lighten(0.2, orange) : lighten(0.10, gray)};
  font-weight: 700;
  text-decoration: none;
  padding: 12px;
  align-self: flex-end;
`;


const VenueInfoContainer = styled.div`
  padding: 0 12px;
`;

const VenueSubheader = styled.div`
	margin-bottom: 12px;
	font-size: 24px;
	font-weight: 400;
`;

const SetlistWrapper = styled.div`
  padding: 12px 12px;
  border-radius: 4px;
  line-height: 1.5;
  background: #fff;
  margin: 24px 0;
  box-shadow: 0 5px 15px 0 hsla(0, 0%, 0%, 0.15);
  border-radius: 4px;
`;

const SetWrapper = styled.div`
	padding: 16px 0;
`;

const SetTitle = styled.span`
	font-size: 16px;
	font-weight: 700;
	color: #ff6f55;
`;

const TrackWrapper = styled.span``;

const TrackLink = styled(Link)`
  text-decoration: none;
  letter-spacing: -.01em;
  color: ${black};
  &:hover {
    text-decoration: underline;
  }
`;

const TrackNoteAnnotation = styled.sup``;

const TrackNote = styled.span;

const NotesWrapper = styled.div``;

const NotesHeader = styled.h4``;

const StreamContainer = styled.div`
	display: flex;
  flex-direction: row;
  
  ${mobile(css`
    flex-direction: column;
  `)};
`;

const StreamLink = styled.a`
	display: flex;
	flex: 1;
	opacity: ${props => props.active ? 1 : 0.25};
	pointer-events: ${props => props.active ? 'auto' : 'none'};
	// background: ${gray};
	margin: 0 0.1em;
	padding: 0.5em 0;
	text-decoration: none;
	justify-content: center;
	color: #b24d3b;
	font-size: 24px;
	font-weight: 700;
`;

const Container = styled.div`
  padding: 0 12px;
`;

const Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
`;

export default Show;