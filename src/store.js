import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  if(action.type === "AIRCRAFTS_SUCCESS") {
    return {
      ...state,
      aircrafts: action.aircrafts.filter((arr) => {
        return arr.Lat && arr.Long
      })
    };
  }
  return state;
}

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

export default createStore(reducer, {aircrafts: []}, applyMiddleware(logger, thunk)); 