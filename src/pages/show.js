import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const SHOW = gql`
  query getShow($id: ID!) {
    show(where: {
      id: $id
    }) {
      id
      date
      venue {
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
          song {
            id
            name
            notes
          }
        }
      }
			archiveUrl
			nugsNetId
			bandcampAlbumId
    }
  }
`;

const ShowDisplayer = (props) => {
  const { loading, error, data } = useQuery(SHOW, { variables: { id: props.match.params.id }})

  console.log('data: ', data);

  if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
		
	const setlistNotes = [];
  const { id, date, venue, setlist, notes, archiveUrl,  nugsNetId, bandcampAlbumId } = data.show;
  return (
    <Wrapper key={id}>
      <Container>
				<BandDateContainer>
					<BandDateWrapper>
						Goose, {date}
					</BandDateWrapper>
				</BandDateContainer>
        <Header>{venue.name}</Header>
				<VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>
        <SetlistWrapper>
          {setlist.map(({ name, tracks }) => (
              <SetWrapper>
                <SetTitle>{name.replace('_', ' ')}: </SetTitle>
                {tracks.map(({ notes, song }) => {
									// add note to the notes array for later rendering
									if (notes) {
										setlistNotes.push(notes);
									}
									return (
										<TrackWrapper>
											<TrackLink to={`/songs/${song.id}`}>{song.name}</TrackLink>
											{notes && <TrackNoteAnnotation>[{setlistNotes.length}]</TrackNoteAnnotation>}
											, 
										</TrackWrapper>
									)
								})
							}
              </SetWrapper>
            )
          )}

					<NotesHeader>Coach's Notes</NotesHeader>
					{setlistNotes.map((note, index) => {
						return <TrackNote>[{index+1}] {note}</TrackNote>
					})}
        </SetlistWrapper>
      </Container>
      <Container>
        <Header>Stream / Download</Header>
				<StreamContainer>
					<StreamLink active={archiveUrl} target="_blank" href={`https://archive.org/details/${archiveUrl}`}>Archive.org</StreamLink>
					<StreamLink active={nugsNetId} target="_blank" href={`https://play.nugs.net/#/catalog/recording/${nugsNetId}`}>Nugs.net</StreamLink>
					<StreamLink active={bandcampAlbumId} target="_blank" href={`https://goosetheband.bandcamp.com/album/${bandcampAlbumId}`}>Bandcamp</StreamLink>
				</StreamContainer>
      </Container>
      <Container>
        <Header>Videos</Header>

      </Container>
      <Container>
        <Header>Comments</Header>

      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: rgba(66,66,66,.95);
`;

const VenueSubheader = styled.div`
	margin-bottom: 12px;
	font-size: 24px;
	font-weight: 400;
`;

const BandDateContainer = styled.div`
	border-top: 4px solid #ff6f55;
	display: flex;
`;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 8px;
	color: #ffffff;
	font-weight: 700;
`;

const ShowHeader = styled.div`
  padding: 8px;
  background: #ff6f55;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.8px;
  border-radius: 4px;
`;

const SetlistWrapper = styled.div`
  padding: 12px 0;
	border-radius: 4px;
`;

const StreamContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const StreamLink = styled.a`
	display: flex;
	flex: 1;
	background: #bdc3c7;
	margin: 0 0.1em;
	padding: 0.5em 0;
	text-decoration: none;
	justify-content: center;
	color: #ff6f55;
	font-weight: 700;
`;

const SetWrapper = styled.div`
	padding: 16px 0;
`;

const SetTitle = styled.span`
	font-size: 16px;
	font-weight: 700;
	color: #ff6f55;
`;

const Container = styled.div``;

const Header = styled.h1``;

const NotesHeader = styled.h4``;

const TrackWrapper = styled.span``;

const TrackLink = styled(Link)`
	text-decoration: none;
`;

const TrackNoteAnnotation = styled.sup``;

const TrackNote = styled.div``;



export default ShowDisplayer;