import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { KeyboardArrowRight } from '@styled-icons/material';
import moment from 'moment';

import LoadingSong from './LoadingSong';
import { Wrapper,
  SongLinkContainer,
  BandDateWrapper,
  SongLinkWrapper,
  SongLink,
  MobileTableDown,
  MediaTableDown,
  SongDescription,
  StyledIcon } from './StyledComponents';
import { ArchiveLogo, NugsNetLogo, YouTubeLogo, BandcampLogo } from '../../components/logos';
import { TableContainer, Table, THEAD, TableHeader, TableRow, LoadingTableRow, TableDown, PaginationContainer, PaginationControls, TrackLink, SecondaryData } from '../../components/tables';

// const PAGE_SIZE = 15;

const SONGS = gql`
 query getSong($id: ID!) {
  song(where: {
    id: $id
    }) {
    id
    name
    originalArtist
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

const Song = (props) => {
  // const [ page, setPage ] = useState(0);
  const { loading, error, data } = useQuery(SONGS, { variables: { id: props.match.params.id }})

  if (loading) return <LoadingSong />;
  if (error) return <p>Error :(</p>;

  document.title = `${data.song.name} - ${data.song.originalArtist} - El Göose`;

   return(
    <Wrapper key={data.song.id}>
      <SongLinkContainer>
        <BandDateWrapper>
          {data.song.name}
          <div style={{fontSize: 16}}>{data.song.originalArtist}</div>
        </BandDateWrapper>
        <SongLinkWrapper>
          <SongLink active>Performances</SongLink>
          <SongLink>History</SongLink>
          <SongLink>Videos</SongLink>
          <SongLink>Stats</SongLink>
        </SongLinkWrapper>
      </SongLinkContainer>
      {/* <SongTitle></SongTitle> */}
      <SongDescription>{data.song.notes}</SongDescription>
      <TableContainer>
        <Table>
          <THEAD>
            <TableHeader hideDesktop>Shows</TableHeader>
            <TableHeader hideMobile>Date</TableHeader>
            <TableHeader hideMobile>Venue</TableHeader>
            <TableHeader hideMobile>Media</TableHeader>
            <TableHeader hideDesktop></TableHeader>
          </THEAD>
          <tbody>
            {data.song.tracks.map((track) => {
              console.log('videos: ', track.videos);
              return (
                <TableRow>
                  <TableDown hideMobile>
                    <TrackLink to={`/shows/${track.set.show.id}`}>{moment(track.set.show.date).format('M/D/YYYY')}</TrackLink>
                  </TableDown>
                  <TableDown hideMobile>{track.set.show.venue.name}
                    {track.set.show.venue.city && (
                      <SecondaryData>
                        {track.set.show.venue.city}, {track.set.show.venue.state}    
                      </SecondaryData>
                    )}
                  </TableDown>
                  <MobileTableDown hideDesktop>
                    <TrackLink to={`/shows/${track.set.show.id}`}>
                      <span style={{ fontSize: 12 }}>{moment(track.set.show.date).format('M/D/YYYY')}</span>
                      <div>{track.set.show.venue.name}</div>
                      {track.set.show.venue.city && (
                        <SecondaryData>
                          {track.set.show.venue.city}, {track.set.show.venue.state}    
                        </SecondaryData>
                      )}
                    </TrackLink>
                  </MobileTableDown>
                  <MediaTableDown hideMobile={true}>
                    <ArchiveLogo archiveUrl={track.set.show.archiveUrl}  />
                    <NugsNetLogo nugsNetId={track.set.show.nugsNetId} />
                    <BandcampLogo bandcampAlbumId={track.set.show.bandcampAlbumId} />
                    <YouTubeLogo videoId={track && track.videos && track.videos[0] && track.videos[0].videoId} active={track.videos.length} />
                  </MediaTableDown>
                  <TableDown hideDesktop>
                      <StyledIcon as={KeyboardArrowRight} size={36} />
                    </TableDown>
                </TableRow>
              )}
            )}
          </tbody>
        </Table>
        {/* <PaginationContainer>
          <PaginationControls 
            onClick={() => setPage(page - 1)}>
              {' < Previous Page '}
          </PaginationControls>
          <PaginationControls
            onClick={() => setPage(page + 1)}>
              {' Next Page > '}
          </PaginationControls>
        </PaginationContainer> */}
      </TableContainer>
    </Wrapper>
   )
}

export default Song;