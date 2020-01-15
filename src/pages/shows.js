import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const SHOWS = gql`
  {
    shows {
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
    }
  }
`;

const ShowDisplayer = (props) => {
  const { loading, error, data } = useQuery(SHOWS)

  console.log('data: ', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let setlistNotes = [];
  return data.shows.map(({ id, date, venue, setlist }) => (
    <Wrapper key={id}>
        <BandDateContainer>
          <BandDateWrapper>
            Goose, <ShowLink to={`/shows/${id}`}>{date}</ShowLink>
          </BandDateWrapper>
        </BandDateContainer>
        <Header>{venue.name}</Header>
				<VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>
        <SetlistWrapper>
          {setlist.map(({ name, tracks }) => (
              <SetWrapper>
                <SetTitle>{name.replace('_', ' ')}: </SetTitle>
                {tracks.map(({ id, notes, song, videos }) => {
									// add note to the notes array for later rendering
									if (notes) {
										setlistNotes.push(notes);
                  }
									return (
										<TrackWrapper>
											<TrackLink to={`/track/${id}`}>{song.name}</TrackLink>
											{notes && <TrackNoteAnnotation>[{setlistNotes.length}]</TrackNoteAnnotation>}
											, 
										</TrackWrapper>
									)
								})
							}
              </SetWrapper>
            )
          )}

          {/* <NotesHeader>Coach's Notes</NotesHeader>
          {setlistNotes.map((note, index) => {
            return <TrackNote>[{index+1}] {note}</TrackNote>
          })} */}
        </SetlistWrapper>
      </Wrapper>
  ));
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

const ShowLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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
	opacity: ${props => props.active ? 1 : 0.25};
	pointer-events: ${props => props.active ? 'auto' : 'none'};
	background: #bdc3c7;
	margin: 0 0.1em;
	padding: 0.5em 0;
	text-decoration: none;
	justify-content: center;
	color: #b24d3b;
	font-size: 24px;
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
  color: rgba(66,66,66,.95);
  &:hover {
    text-decoration: underline;
  }
`;

const TrackNoteAnnotation = styled.sup``;

const TrackNote = styled.div``;

export default ShowDisplayer;