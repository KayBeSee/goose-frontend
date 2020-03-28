import React from 'react';
import { KeyboardArrowRight } from '@styled-icons/material';
import moment from 'moment';

import { RelistenLogo, NugsNetLogo, YouTubeLogo, BandcampLogo } from '../../components/logos';
import { TableContainer, Table, THEAD, TableHeader, TableRow, TableDown, TrackLink, SecondaryData } from '../../components/tables';

import {
  Wrapper,
  SongLinkContainer,
  BandDateWrapper,
  SongLinkWrapper,
  SongLink,
  MobileTableDown,
  MediaTableDown,
  SongDescription,
  StyledIcon
} from './StyledComponents';

const SongPerformances = ({ song }) => {


  return (
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
          {song.tracks.map((track, trackIndex) => {
            return (
              <TableRow odd={trackIndex % 2}>
                <TableDown hideMobile>
                  <TrackLink to={`/shows/${track.set.show.id}/setlist`}>{moment(track.set.show.date).format('M/D/YYYY')}</TrackLink>
                </TableDown>
                <TableDown hideMobile>
                  {track.set.show.eventName ? track.set.show.eventName : track.set.show.venue.name}
                  {track.set.show.venue.city && (
                    <SecondaryData>
                      {track.set.show.venue.city}, {track.set.show.venue.state}
                    </SecondaryData>
                  )}
                </TableDown>
                <MobileTableDown hideDesktop>
                  <TrackLink to={`/shows/${track.set.show.id}/setlist`}>
                    <span style={{ fontSize: 12 }}>{moment(track.set.show.date).format('M/D/YYYY')}</span>
                    <div>{track.set.show.eventName ? track.set.show.eventName : track.set.show.venue.name}</div>
                    {track.set.show.venue.city && (
                      <SecondaryData>
                        {track.set.show.venue.city}, {track.set.show.venue.state}
                      </SecondaryData>
                    )}
                  </TrackLink>
                </MobileTableDown>
                <MediaTableDown hideMobile={true}>
                  <RelistenLogo relisten={track.set.show.relisten} />
                  <NugsNetLogo nugsNetId={track.set.show.nugsNetId} />
                  <BandcampLogo bandcampAlbumId={track.set.show.bandcampAlbumId} />
                  <YouTubeLogo showId={track.set.show.id} videoId={track?.videos[0]?.videoId} />
                </MediaTableDown>
                <TableDown hideDesktop>
                  <StyledIcon as={KeyboardArrowRight} size={36} />
                </TableDown>
              </TableRow>
            )
          }
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
  )
}

export default SongPerformances;