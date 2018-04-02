import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as consts from './constants/const';

const initialState = {
  aircrafts: [],
  aircraftsInitial: [],
  load: false,
  limit:1000
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case consts.AIRCRAFTS_SUCCESS: {
      return {
        ...state,
        aircrafts: action.aircrafts,
        aircraftsInitial: [...action.aircraftsInitial],
        load: false
      };
    }

    case consts.LOAD_PROGRESS: {
      return {
        ...state,
        load: true,
      }  
    }

    case consts.AIRCRAFTS_SEARCH: {
      return {
        ...state,
        aircrafts: action.aircrafts,
        load: false,
      }
    }

    case consts.AIRCRAFTS_LIMIT: {
      return {
        ...state,
        aircrafts: action.aircrafts,
        load: false,
      }
    }

    default: {
      return state;
    }
  }
}

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

export default createStore(reducer, applyMiddleware(logger, thunk)); 