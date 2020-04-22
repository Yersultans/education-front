import {
  FETCH_USER_ERROR,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_COINS,
} from '../actions/types';

const initialState = {
  user: null,
  isLoaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_START:
      return { isLoaded: false, user: null, error: null };
    case FETCH_USER_SUCCESS:
      return { isLoaded: true, user: action.payload, error: null };
    case FETCH_USER_ERROR:
      return { isLoaded: true, error: action.payload };
    case LOGOUT_USER: {
      return { isLoaded: false, user: null, error: null };
    }
    case UPDATE_USER_COINS: {
      return {
        isLoaded: true,
        user: { ...state.user, wupai: state.user.wupai + action.payload },
        error: null,
      };
    }
    default:
      return state;
  }
}
