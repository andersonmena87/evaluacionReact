import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  if(action.type === "AIRCRAFTS_SUCCESS") {
    let count = 0;
    return {
      ...state,
      aircrafts: action.aircrafts.filter((arr) => {
          count ++;
          return arr.Lat && arr.Long && arr.Id && count < 1000;
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