// actions
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEY } from './types';

export const fetchUser = () => async (dispatch) => {
  // Reason why the project need redux-thunk:
  // only dispatch when the following request is completed
  // but it is async, so the dispatch will also need to be async
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  // POST request to our server
  // server returns an user object
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
