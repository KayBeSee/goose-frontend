import styled from 'styled-components';
import rem from '../../utils/rem';

export * from './ArchiveOrgLogo';
export * from './BandcampLogo';
export * from './YouTubeLogo';
export * from './NugsNetLogo';

export const StyledIcon = styled.div`
  && {
    width: ${p => rem(p.size || 20)};
    height: ${p => rem(p.size || 20)};
  }
`;