import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import { KeyboardArrowRight } from '@styled-icons/material';
import moment from 'moment';
import { mobile } from '../utils/media';
import { ArchiveLogo, NugsNetLogo, YouTubeLogo, BandcampLogo } from '../components/logos';
import { black } from '../utils/colors';
import rem from '../utils/rem';

import { TableContainer, Table, THEAD, TableHeader, TableRow, TableDown, PaginationContainer, PaginationControls, TrackLink, SecondaryData } from '../components/tables';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

   return(
    <Wrapper key={data.song.id}>
      <SongLinkContainer>
        <BandDateWrapper>
          {data.song.name}
          <div style={{fontSize: 16}}>{data.song.originalArtist}</div>
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
                    <ArchiveLogo active={track.set.show.archiveUrl} />
                    <NugsNetLogo active={track.set.show.nugsNetId} />
                    <BandcampLogo active={track.set.show.bandcampAlbumId} />
                    <YouTubeLogo active={track.videos.length} />
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

const Wrapper = styled.div`
  background: #F5F7FA;
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${black};
  margin-top: -1px;
`;

const SongLinkContainer = styled.div`
	border-top: 4px solid #ff6f55;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
  justify-content: space-between;
`;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 12px;
	color: #ffffff;
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
`;

const SongLinkWrapper = styled.div`
  display: flex;

  ${mobile(css`
    margin-top: 24px;
  `)};
`;

const SongLink = styled(Link)`
  color: #ff6f55;
  font-weight: 700;
  text-decoration: none;
  padding: 12px;
  align-self: flex-end;
`;

const MobileTableDown = styled(TableDown)`
  line-height: 1.5;
`;

const MediaTableDown = styled(TableDown)`
  display: flex;
  justifyContent: space-around;
`;

const SongDescription = styled.h5``;

const StyledIcon = styled.div`
  && {
    width: ${p => rem(p.size || 20)};
    height: ${p => rem(p.size || 20)};
  }
`;

export default Song;