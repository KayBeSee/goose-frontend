
import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import YouTube from 'react-youtube';

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from '../../components/FormComponents';
import { mobile } from '../../utils/media';
import { darkOffWhite, orange, offWhite } from '../../utils/colors';

const _onYTReady = (event) => {
  // access to player in all event handlers via event.target
  // event.target.pauseVideo();
}

const VideoIdForm = ({ shows, videoId, setVideoId }) => {
  return (
    <Fragment>
      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Video Id
        </FormSectionHeader>
          <FormSectionSubtext>
            Here is some explainer text about the section. Yada, yada, yada...
          </FormSectionSubtext>
        </FormExplainer>
        <ActualForm>
          <Input
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder={"oKYaXlGncgY"} />
        </ActualForm>
      </FormSection>
      <FormSectionGray>
        <YouTubePreview
          videoId={videoId}
          opts={{}}
          onReady={_onYTReady}
        />
      </FormSectionGray>
    </Fragment>
  )
};

const YouTubePreview = styled(YouTube)`
  width: 100%;
`;

const FormSectionGray = styled(FormSection)`
  background: ${offWhite};
  justify-content: center;
`;

export default VideoIdForm;