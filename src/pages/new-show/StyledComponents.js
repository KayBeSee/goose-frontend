import styled from 'styled-components';
import { black, white, offWhite, darkOffWhite } from '../../utils/colors';

export const FormSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  margin: 24px 0;
  padding: 24px;
  border-top: 2px solid ${darkOffWhite};
`;
export const FormExplainer = styled.div`
  flex: 1;
`;

export const FormSectionHeader = styled.h2`
  min-width: 156px;
`;
export const FormSectionSubtext = styled.h5``;

export const ActualForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 250px;

  input {
    flex: 1;
  }
`;

export const Input = styled.input`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid rgb(241, 243, 245);
  box-shadow: 0px;
  outline: 0;
  text-align: center;
  font-family: 'Raleway', sans-serif;

  &:active, &:focus {
    border: 1px solid #ff6f55;
    outline: 0;
  }
`;