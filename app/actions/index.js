import axios from 'axios';
import { normalize } from 'normalizr';

import config from 'config';
import {
  FETCH_USER_SUCCESS,
  LOGOUT_USER,
  REMOVE_ENTITIES,
} from './types';

export const loginUser = async (values, dispatch) => {
  const res = await axios.post(`${config.getBackendUrl()}/api/auth/login`, values);
  const newToken = res.data ? res.data.token : '';
  if (newToken.length > 0) {
    localStorage.setItem('token', newToken);
  }
  dispatch({ type: FETCH_USER_SUCCESS, payload: res.data.user });
};

export const logoutUser = (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_USER });
  dispatch({ type: REMOVE_ENTITIES });
};

export const saveCurrentUser = (user, dispatch) => {
  dispatch({ type: FETCH_USER_SUCCESS, payload: user });
};
