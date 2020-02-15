import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link, Redirect } from "react-router-dom";
import styled from 'styled-components';
import { AUTHORIZATION } from '../constants';
import { black, white } from '../utils/colors';
import { getToken } from '../utils/token';

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!) {
    createUser(data: {
      email: $email,
      password: $password
    }) {
      user {
        id
        email
      }
      token
    }
  }
`;


const Signup = (props) => {
  document.title = 'Signup - El Göose';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION);
  const token = getToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await signup({ variables: { email, password }});
    localStorage.setItem(AUTHORIZATION, data.createUser.token);
    sessionStorage.setItem('email', data.createUser.user.email);
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if(token) {
    return <Redirect to={'/setlists'} />
  } else {
    return(
    <Wrapper key={'ab123c'}>
      <FormContainer>
        <SignupContainer>
          <SignupHeader>Sign up for El Göose</SignupHeader>
  
          <SignupForm onSubmit={handleSubmit}>
            <UsernameInput
              autofocus="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Username"} />
            <PasswordInput 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder={"Password"} />
            <SignupButton 
              type="submit"
              onClick={handleSubmit}>Create Account</SignupButton>
          </SignupForm>
  
        </SignupContainer>
      </FormContainer>
      <SignupText to={'/login'}>Already Have an Account? Log In</SignupText>
    </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #222;
  width: 100%;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${black};
  // margin-top: -1px;
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const SignupContainer = styled.div`
  max-width: 750px;
  background: #fff;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 46px -4px rgba(0,0,0,.28);
  margin: 18px;
`;

const SignupForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const SignupHeader = styled.h1`
  text-align: center;
  color: #ff6f55;
`;

const Input = styled.input`
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

const UsernameInput = styled(Input)``;

const PasswordInput = styled(Input)`
  margin-top: 12px;
`;

const SignupButton = styled.button`
  padding: 16px;
  background: #ff6f55;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }

  &:active, &:focus {
    outline: 0;
    background: #e5634c;
  }
`;

const SignupText = styled(Link)`
  color: ${white};
  text-decoration: none;
  cursor: pointer;
  letter-spacing: -0.03em;
`;

export default Signup;