import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import lighten from 'polished/lib/color/lighten';
import { black, orange, gray, offWhite } from '../../utils/colors';
import rem from '../../utils/rem';
import { mobile } from '../../utils/media';
import { TableDown } from '../../components/tables';

export const Wrapper = styled.div`
  background: ${offWhite};
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${black};
  margin-top: -1px;
`;

export const SongLinkContainer = styled.div`
	border-top: 4px solid ${orange};
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
  justify-content: space-between;
`;

export const BandDateWrapper = styled.span`
	background: ${orange};
	padding: 12px;
	color: #ffffff;
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
`;

export const SongLinkWrapper = styled.div`
  display: flex;

  ${mobile(css`
    margin-top: 24px;
  `)};
`;

export const SongLink = styled(Link)`
  color: ${props => props.active ? orange : lighten(0.10, gray)};
  font-weight: 700;
  text-decoration: none;
  padding: 12px;
  align-self: flex-end;
`;

export const MobileTableDown = styled(TableDown)`
  line-height: 1.5;
`;

export const MediaTableDown = styled(TableDown)`
  display: flex;
  justify-content: space-around;
`;

export const SongDescription = styled.h5``;

export const StyledIcon = styled.div`
  && {
    width: ${p => rem(p.size || 20)};
    height: ${p => rem(p.size || 20)};
  }
`;