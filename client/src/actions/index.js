// actions
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  // Reason why the project need redux-thunk:
  // only dispatch when the following request is completed
  // but it is async, so the dispatch will also need to be async
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
