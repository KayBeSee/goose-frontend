import styled from 'styled-components';
import { orange } from '../utils/colors';

export const FormSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  // margin: 24px 0;
  padding: 24px;
`;
export const FormExplainer = styled.div`
  flex: 1 0 200px;
`;

export const FormSectionHeader = styled.h2`
  margin-top: 0px;
  flex: 1 0 350px;
`;
export const FormSectionSubtext = styled.h5`
  font-weight: 100;
`;

export const ActualForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 200px;
  position: relative;
  justify-content: center;
`;

export const Input = styled.input`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid rgb(241, 243, 245);
  box-shadow: 0px;
  outline: 0;
  text-align: left;
  font-family: 'Raleway', sans-serif;

  &:active, &:focus {
    border: 1px solid ${orange};
    outline: 0;
  }
`;