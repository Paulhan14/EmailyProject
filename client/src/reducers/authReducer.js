// (previousState, action) => nextState

/* Things you should never do inside a reducer:
Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random(). 
Given the same arguments, it should calculate the next state and return it.
No surprises. No side effects. No API calls. No mutations. Just a calculation.*/

// 1. Don't mutate state 2. return previous state in the default case
// Object.assign() creates a copy of the object

// authReducer: record whether user is logged in
import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // when payload is '', return false
    default:
      return state;
  }
}
