import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

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


const AttendanceButtonComponent = ({ showId }) => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_SHOWS)
  const [addAttendance, { addShowLoading, addShowError, data: addData }] = useMutation(ADD_ATTENDANCE)
  const [removeAttendance, { removeShowLoading, removeShowError, data: removeData }] = useMutation(REMOVE_ATTENDANCE)

  const attended = userData && !!userData.me.shows.filter((show) => show['id'] === showId).length;

  const toggleAttendance = () => {
    if(attended) {
      removeAttendance({ variables: { id: { id: showId } } });
    } else {
      addAttendance({ variables: { id: { id: showId } } });
    }
  }


  return (
    <AttendanceButton 
      active={attended}
      onClick={() => toggleAttendance()}>
      {attended ? 'I Was There' : 'I Was There'}
    </AttendanceButton>
  )
}

const AttendanceButton = styled.button`
  padding: 16px;
  background: ${props => props.active ? '#ff6f55' : '#bdc3c7'};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  outline: 0;

  &:hover {
    cursor: pointer;
  }

  &:active {
    outline: 0;
    background: ${props => props.active ? '#e5634c' : '#aaafb3'};
  }

  &:focus {
    outliine: 0;
  }
`;

export default AttendanceButtonComponent