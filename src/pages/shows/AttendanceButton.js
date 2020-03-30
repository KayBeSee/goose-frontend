import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AUTHORIZATION } from '../../constants';
import { orange, darkOrange, gray, darkGray } from '../../utils/colors';

const GET_USER_SHOWS = gql`
  query {
  me {
    id
    email
    shows {
      id
    }
  }
}
`;

const ADD_ATTENDANCE = gql`
  mutation toggleAttendance($id: ShowWhereUniqueInput!) {
    updateUser(data: {
      shows: {
        connect: [$id]
      }
    }) {
      id
      email
      shows {
        id
      }
    }
  }
`;

const REMOVE_ATTENDANCE = gql`
  mutation toggleAttendance($id: ShowWhereUniqueInput!) {
    updateUser(data: {
      shows: {
        disconnect: [$id]
      }
    }) {
      id
      email
      shows {
        id
      }
    }
  }
`;


const AttendanceButtonComponent = ({ showId, style, history }) => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_SHOWS)
  const [addAttendance, { loading: addShowLoading, addShowError, data: addData }] = useMutation(ADD_ATTENDANCE)
  const [removeAttendance, { loading: removeShowLoading, removeShowError, data: removeData }] = useMutation(REMOVE_ATTENDANCE)

  // KBC-TODO: need to add all loading an error states

  const attended = userData && !!userData.me.shows.filter((show) => show['id'] === showId).length;

  const token = localStorage.getItem(AUTHORIZATION);

  const toggleAttendance = () => {
    if (attended) {
      removeAttendance({ variables: { id: { id: showId } } });
    } else {
      addAttendance({ variables: { id: { id: showId } } });
    }
  }

  const isLoading = addShowLoading || removeShowLoading;


  return (
    <AttendanceButton
      style={style}
      active={attended}
      onClick={() => {
        if (token) {
          toggleAttendance()
        }
        else {
          history.push('/login')
        }
      }}>
      {/* TODO: add loading */}
      {isLoading ? 'Loading...' : 'I Was There'}
    </AttendanceButton>
  )
}

const AttendanceButton = styled.button`
  padding: 16px;
  background: ${props => props.active ? orange : gray};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  outline: 0;
  margin: 0;

  &:hover {
    cursor: pointer;
  }

  &:active {
    outline: 0;
    background: ${props => props.active ? darkOrange : darkGray};
  }

  &:focus {
    outline: 0;
  }
`;

export default withRouter(AttendanceButtonComponent)