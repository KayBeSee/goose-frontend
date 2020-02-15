import React from 'react';
import styled from 'styled-components';

import SetForm from './SetForm';
import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from './StyledComponents';


const SetlistForm = ({ setlist, setSetlist }) => {

  const setSet = (set, index) => {
    console.log('set, index:', set, index);
    const updatedSetlist = setlist;
    updatedSetlist[index] = set;
    console.log('updatedSetlist: ', updatedSetlist);
    setSetlist(updatedSetlist);
  }
  

  console.log('setlistform: ', setlist);
  return (
    <FormSection style={{ flexDirection: 'column' }}>
      <FormExplainer style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
          <FormSectionHeader>
              Setlist
          </FormSectionHeader>
          <FormSectionSubtext>
              Here is some explainer text about the section. Yada, yada, yada...
          </FormSectionSubtext>
          </div>
          <div>
          <ControlButton type="button" onClick={() => setSetlist([...setlist, { name: `SET_${setlist.length+1}`, tracks: [''] } ])}>Add Set</ControlButton>
          <ControlButton type="button" onClick={() => setSetlist([...setlist, { name: `ENCORE_${setlist.length+1}`, tracks: [''] } ])}>Add Encore</ControlButton>
          </div>
      </FormExplainer>
      <ActualForm>
        {setlist.map((set, index) => (
          <SetForm 
            key={index}
            set={set}
            setSet={(set) => {
              const updatedSetlist = setlist;
              updatedSetlist[index] = set;
              console.log('updatedSetlist: ', updatedSetlist);
              setSetlist(updatedSetlist); 
            }} />

        ))}
      </ActualForm>
    </FormSection>
  )
};

const ControlButton = styled.button`

`;

export default SetlistForm;