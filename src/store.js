import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AIRCRAFTS_SUCCESS, AIRCRAFTS_SEARCH } from './constants/const';

const reducer = (state, action) => {
  if (action.type === AIRCRAFTS_SUCCESS) {
    let count = 0;
    return {
      ...state,
      aircrafts: action.aircrafts.filter((arr) => {
        if (arr.Lat && arr.Long && arr.Id) {
          count++;
        }

        //return arr.Lat && arr.Long && arr.Id && count < 1001;
        return arr.Lat && arr.Long && arr.Id;
      }),
      load: false
    };
  } else if (action.type === AIRCRAFTS_SEARCH) {
    let count = 0;
    return {
      ...state,
      aircrafts: action.aircrafts.filter((arr) => {
        if (arr.Lat && arr.Long && arr.Id) {
          count++;
        }
        return arr.Lat && arr.Long && arr.Id && count < 1001;
      }),
      load: false
    }
  }

  return state;
}

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

export default createStore(reducer, { aircrafts: [], load: true }, applyMiddleware(logger, thunk)); 