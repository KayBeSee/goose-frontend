import styled from 'styled-components';
import { Link } from "react-router-dom";

export const TableContainer = styled.div`
  box-shadow: 0 5px 15px 0 hsla(0, 0%, 0%, 0.15);
  background: #fff;
  border-radius: 4px;
`;

export const Table = styled.table`
  border: none;
  border-collapse: collapse;
`;

export const THEAD = styled.thead`
  background: #F2F5F7;
  border: none;
  padding: 24px;
`;

export const TableHeader = styled.th`
  border: none;
  padding: 24px;
  text-align: ${props => props.alignRight ? 'right' : 'left'}
`;

export const TableRow = styled.tr`
  border: none;
  padding: 24px 0;
`;

export const TableDown = styled.td`
  border: none;
  padding: 24px;
  text-align: ${props => props.alignRight ? 'right' : 'left'}
`;

export const PaginationContainer = styled.div`
  background: hsl(200, 10%, 94%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
`;

export const PaginationControls = styled.span`
  cursor: pointer;
  padding: 24px;
  color: #ff6f55;
`;

export const TrackLink = styled(Link)`
  color: #1E262E;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SecondaryData = styled.div`
  font-size: 12px;
  color: #576574;
`;