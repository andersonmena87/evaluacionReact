import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AIRCRAFTS_SUCCESS, AIRCRAFTS_SEARCH, LOAD_PROGRESS } from './constants/const';

const initialState = {
  aircrafts: [],
  load: false,
}

const reducer = (state = initialState, action) => {
  if (action.type === AIRCRAFTS_SUCCESS) {
    return {
      ...state,
      aircrafts: action.aircrafts,
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
  }else if(action.type === LOAD_PROGRESS){
    return {
      ...state,
      load: true,
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

export default createStore(reducer, applyMiddleware(logger, thunk)); 