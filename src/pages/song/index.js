import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Route, useLocation } from "react-router-dom";

import LoadingSong from './LoadingSong';
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

import Videos from './SongVideos';
import Performances from './SongPerformances';

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
        tracks {
          id
        }
      }
      set {
        id
        name
        show {
          id
          date
          eventName
          venue {
            id
            name
            city
            state
          }
          relisten
          nugsNetId
          bandcampAlbumId
        }
      }
    }
  }
}
`;


// some fire use of reduce right here
const getAllVideos = (song) => {
  const videoIds = song.tracks.reduce((videoIdArray, track) => {
    return videoIdArray.concat(track.videos.reduce((videoAccume, video) => {
      if (!videoIdArray.includes(video.videoId)) {
        return videoAccume.concat(video.videoId);
      }
      return videoAccume;
    }, []));
  }, []);
  return videoIds;
}

const isVideosPage = (location) => {
  return location.pathname.indexOf('video') > -1;
}

const isPerformancePage = (location) => {
  return !isVideosPage(location);
}

const Song = (props) => {
  // const [ page, setPage ] = useState(0);
  const { loading, error, data } = useQuery(SONGS, { variables: { id: props.match.params.id } });
  const location = useLocation();
  console.log('data: ', data);
  if (loading) return <LoadingSong />;
  if (error) return <p>Error :(</p>;

  document.title = `${data.song.name} - ${data.song.originalArtist} - El Göose`;
  let setlistVideoIds = getAllVideos(data.song);

  return (
    <Wrapper key={data.song.id}>
      <SongLinkContainer>
        <BandDateWrapper>
          {data.song.name}
          <div style={{ fontSize: 16 }}>{data.song.originalArtist}</div>
        </BandDateWrapper>
        <SongLinkWrapper>
          <SongLink active={isPerformancePage(location)} to={isPerformancePage(location) ? null : `../${data.song.id}`}>Performances</SongLink>
          <SongLink>History</SongLink>
          <SongLink active={isVideosPage(location)} to={`${data.song.id}/videos`}>Videos</SongLink>
          <SongLink>Stats</SongLink>
        </SongLinkWrapper>
      </SongLinkContainer>

      <SongDescription>{data.song.notes}</SongDescription>

      <Route path="/songs/:id/videos" component={() => <Videos videosIds={setlistVideoIds} song={data.song} />} />
      <Route path="/songs/:id" exact component={() => <Performances song={data.song} />} />

    </Wrapper>
  )
}

export default Song;