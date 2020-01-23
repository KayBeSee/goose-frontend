import { AUTHORIZATION } from '../constants';

export const getToken = () => {
  return localStorage.getItem(AUTHORIZATION);
}

export const removeToken = () => {
  localStorage.removeItem(AUTHORIZATION);
}