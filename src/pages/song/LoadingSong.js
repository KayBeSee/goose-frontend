import React from 'react';

import { 
    Wrapper,
    SongLinkContainer,
    BandDateWrapper,
    SongLinkWrapper,
    SongLink 
} from './StyledComponents';

import { OrangeLoadingAnimation } from '../../components/Loading';

import { TableContainer, Table, THEAD, TableHeader, LoadingTableRow } from '../../components/tables';

const LoadingSong = () => {
    document.title = `Loading Song... - El Göose`;
  
     return(
      <Wrapper>
        <SongLinkContainer>
          <BandDateWrapper>
              <OrangeLoadingAnimation style={{ height: 62, width: 350 }} />
          </BandDateWrapper>
          <SongLinkWrapper>
            <SongLink active>Performances</SongLink>
            <SongLink>History</SongLink>
            <SongLink>Videos</SongLink>
            <SongLink>Stats</SongLink>
          </SongLinkWrapper>
        </SongLinkContainer>
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
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
            </tbody>
          </Table>
        </TableContainer>
      </Wrapper>
     )
  }

export default LoadingSong;