import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { offWhite } from '../../utils/colors';
import { mobile } from '../../utils/media';

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from '../../components/FormComponents';

const ReviewScreen = ({
  date,
  venue,
  setlist,
  notes,
  archiveUrl,
  nugsNetId,
  bandcampAlbumId,
}) => (
    <Fragment>
      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Date
          </FormSectionHeader>
        </FormExplainer>
        <ActualForm>
          {date}
        </ActualForm>
      </FormSection>
      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Venue
          </FormSectionHeader>
        </FormExplainer>
        <ActualForm>
          <div>{venue.name}</div>
          <div>{venue.city}, {venue.state}</div>
        </ActualForm>
      </FormSection>
      <FormSection style={{ flexDirection: 'column', background: offWhite }} >
        {/* <FormExplainer> */}
        <FormSectionHeader style={{ flex: '1 0' }}>
          Setlist
          </FormSectionHeader>
        {/* </FormExplainer> */}
        <ActualForm>
          {setlist.map((set, index) => (
            <SetContainer key={index}>
              <FormSectionHeader style={{ flex: '1 0' }}>{set.name.replace('_', ' ')}</FormSectionHeader>
              <ActualFormPadding>
                {set.tracks.map((track, index) => (
                  <SongOption key={index}>
                    <Number>{index + 1}) </Number>
                    <SongName>{track.song.name}</SongName>
                    <Segue active={!!track.segue}>></Segue>
                  </SongOption>
                ))}
              </ActualFormPadding>
            </SetContainer>
          ))}
        </ActualForm>
      </FormSection>
      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Show Notes
            </FormSectionHeader>
        </FormExplainer>
        <ActualForm>
          {notes}
        </ActualForm>
      </FormSection>

      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Archive.org URL
            </FormSectionHeader>
        </FormExplainer>
        <ActualForm>
          {archiveUrl}
        </ActualForm>
      </FormSection>
      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Nugs.net ID
            </FormSectionHeader>
        </FormExplainer>
        <ActualForm>
          {nugsNetId}
        </ActualForm>
      </FormSection>
      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Bandcamp Album ID
            </FormSectionHeader>
        </FormExplainer>
        <ActualForm>
          {bandcampAlbumId}
        </ActualForm>
      </FormSection>
    </Fragment >
  );

const ActualFormPadding = styled(ActualForm)`
  margin: 0 48px;
  ${mobile(css`
    margin: 0;
  `)};
`;

const SetContainer = styled.div`
  display: flex;
  padding: 24px;
  background: #fff;
  border: 1px solid #e4e9f1;
  margin: 24px;
  flex-wrap: wrap;

  ${mobile(css`
    margin: 24px 0;
  `)};
`;

const SongOption = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Segue = styled.span`
  align-self: center;
  font-size: 28px;
  opacity: ${p => p.active ? '1' : '0.15'};
  margin: 8px;
  cursor: pointer;
`;

const Number = styled.span`
  align-self: center;
  margin-right: 12px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const SongName = styled.div`
  font-weight: 500;
  font-size: 1em;
`;

export default ReviewScreen;