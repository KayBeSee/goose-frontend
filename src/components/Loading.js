import styled, { keyframes } from 'styled-components';

// Loading State

export const placeHolderShimmer = keyframes`
  0%{
      background-position: -468px 0
  }
  100%{
      background-position: 468px 0
`;

export const GrayAnimatedBackground = styled.div`
  animation: ${placeHolderShimmer} 1s linear infinite forwards;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
`;

export const OrangeAnimatedBackground = styled.div`
  animation: ${placeHolderShimmer} 1s linear infinite forwards;
  background: #f6f7f8;
  background: linear-gradient(to right, #ff684d 8%, #fc4221 18%, #ff684d 33%);
  background-size: 800px 104px;
  position: relative;
`;

export const GrayLoadingAnimation = styled(GrayAnimatedBackground)`
  height: 24px;
`;

export const OrangeLoadingAnimation = styled(OrangeAnimatedBackground)`
  height: 24px;
`;