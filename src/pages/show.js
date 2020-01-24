import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import moment from 'moment';
import YouTube from 'react-youtube';
import Setlist from '../components/setlist';
import { black, offWhite, gray } from '../utils/colors';

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
  const { id, date, setlist, archiveUrl, nugsNetId, bandcampAlbumId } = showData.show;
  
  document.title = `${moment(date).format('M/D/YYYY')} Goose Setlist - El Göose`;
  
  let setlistVideos = [];

  // get all videos from tracks

  
  return (
    <Wrapper key={id}>

      <Setlist show={showData.show} />

      <Container>
        <Header>Stream / Download</Header>
				<StreamContainer>
					<StreamLink active={archiveUrl} target="_blank" href={`https://archive.org/details/${archiveUrl}`}>Archive.org</StreamLink>
					<StreamLink active={nugsNetId} target="_blank" href={`https://play.nugs.net/#/catalog/recording/${nugsNetId}`}>Nugs.net</StreamLink>
					<StreamLink active={bandcampAlbumId} target="_blank" href={`https://goosetheband.bandcamp.com/album/${bandcampAlbumId}`}>Bandcamp</StreamLink>
				</StreamContainer>
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

const StreamContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const StreamLink = styled.a`
	display: flex;
	flex: 1;
	opacity: ${props => props.active ? 1 : 0.25};
	pointer-events: ${props => props.active ? 'auto' : 'none'};
	background: ${gray};
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