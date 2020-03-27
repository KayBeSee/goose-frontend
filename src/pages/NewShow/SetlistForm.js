import React from 'react';
import styled, { css } from 'styled-components';

import SetForm from './SetForm';
import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm } from '../../components/FormComponents';
import { orange, offWhite, white } from '../../utils/colors';
import { mobile } from '../../utils/media';


export const SetlistFormExplainer = () => (
  <FormExplainer style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    {/* <div> */}
    <FormSectionHeader>
      Setlist
          </FormSectionHeader>
    <FormSectionSubtext>
      Here is some explainer text about the section. Yada, yada, yada...
          </FormSectionSubtext>
    {/* </div> */}
  </FormExplainer>
)
const SetlistForm = ({ setlist, setSetlist }) => {

  const setSet = (set, index) => {
    const updatedSetlist = [...setlist];
    updatedSetlist[index] = set;
    console.log('updatedSetlist: ', updatedSetlist);
    setSetlist(updatedSetlist);
  }

  return (
    <ModifiedFormSection>
      <SetlistFormExplainer />
      <ActualForm>
        {setlist.map((set, index) => (
          <SetForm
            key={index}
            set={set}
            setSet={(updatedSet) => setSet(updatedSet, index)}
          />
        ))}

        <ButtonGroup>
          <ControlButton type="button" onClick={() => setSetlist([...setlist, { name: `SET_${setlist.length + 1}`, tracks: [''] }])}>Add Set</ControlButton>
          <ControlButton type="button" secondary onClick={() => setSetlist([...setlist, { name: `ENCORE_${setlist.length + 1}`, tracks: [''] }])}>Add Encore</ControlButton>
        </ButtonGroup>
      </ActualForm>
    </ModifiedFormSection>
  )
};

const ModifiedFormSection = styled(FormSection)`
  flex-direction: column;
  display: block;
  padding: 24px 24px 0;
`;

const ControlButton = styled.button`
  padding: 16px;
  background: ${p => p.secondary ? 'none' : white};
  color: ${orange};
  border: ${p => p.secondary ? 'none' : `1px solid ${orange}`};
  border-radius: 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans - serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }

  &:active, &:focus {
    outline: 0;
  }
`;

const ButtonGroup = styled.div`
background: ${ offWhite};
padding: 24px;
margin: 24px -24px 0;
justify-content: space-between;
display: flex;

${mobile(css`
  justify-content: flex-end;
`)};
`;

export default SetlistForm;