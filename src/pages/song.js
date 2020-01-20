import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import moment from 'moment';
import { ArchiveLogo, NugsNetLogo, YouTubeLogo, BandcampLogo } from '../components/logos';

const SONGS = gql`
 query getSong($id: ID!) {
  song(where: {
    id: $id
    }) {
    id
    name
    notes
    tracks {
      id
      notes
      videos {
        id
        videoId
      }
      set {
        id
        name
        show {
          id
          date
          venue {
            id
            name
            city
            state
          }
          archiveUrl
          nugsNetId
          bandcampAlbumId
        }
      }
    }
  }
}
`;

console.log('SONGS: ', SONGS);

const Song = (props) => {
  console.log('props.match.params.id: ', props.match.params.id);
  const { loading, error, data } = useQuery(SONGS, { variables: { id: props.match.params.id }})

  console.log('data: ', data);
  console.log('error: ', error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

   return(
    <Wrapper key={data.song.id}>
      <SongLinkContainer>
        <BandDateWrapper>
          <span style={{fontSize: 16}}>Song:</span> <br />
          {data.song.name}
        </BandDateWrapper>
        <SongLinkWrapper>
          <SongLink>Performances</SongLink>
          <SongLink>History</SongLink>
          <SongLink>Lyrics</SongLink>
          <SongLink>Stats</SongLink>
        </SongLinkWrapper>
      </SongLinkContainer>
      {/* <SongTitle></SongTitle> */}
      <SongDescription>{data.song.notes}</SongDescription>
      <TrackTable>
        <thead>
          <TableHeader>Date</TableHeader>
          <TableHeader>Venue</TableHeader>
          <TableHeader>Media</TableHeader>
        </thead>
        {data.song.tracks.map((track) => {
          console.log('track: ', track);
          return (
            <TrackRow>
              <TableDown><TrackLink to={`/shows/${track.set.show.id}`}>{moment(track.set.show.date).format('M/D/YYYY')}</TrackLink></TableDown>
              <TableDown>{track.set.show.venue.name} - {track.set.show.venue.city}, {track.set.show.venue.state}</TableDown>
              <TableDown style={{display: 'flex', justifyContent: 'space-around'}}>
                <ArchiveLogo active={track.set.show.archiveUrl} />
                <NugsNetLogo active={track.set.show.nugsNetId} />
                <BandcampLogo active={track.set.show.bandcampAlbumId} />
                <YouTubeLogo active={track.videos.length} />
              </TableDown>
            </TrackRow>
          )}
        )}
        
      </TrackTable>
    </Wrapper>
   )
}

const Wrapper = styled.div`
  background: #fff;
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: rgba(66,66,66,.95);
  margin-top: -1px;
`;

const SongLinkContainer = styled.div`
	border-top: 4px solid #ff6f55;
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
`;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 12px;
	color: #ffffff;
  font-weight: 700;
  font-size: 36px;
  padding-top: 0;
`;

const SongLinkWrapper = styled.div`
  display: flex;
`;

const SongLink = styled(Link)`
  color: #ff6f55;
  font-weight: 700;
  text-decoration: none;
  padding: 12px;
  align-self: flex-end;
`;

const SongDescription = styled.h5``;

const TrackTable = styled.table``;

const TableHeader = styled.th``;

const TrackRow = styled.tr``;

const TableDown = styled.td``;

const TrackLink = styled(Link)`
  color: rgba(66,66,66,.95);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Song;