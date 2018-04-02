import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AIRCRAFTS_SUCCESS, AIRCRAFTS_SEARCH, LOAD_PROGRESS } from './constants/const';

const initialState = {
  aircrafts: [],
  load: false,
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case AIRCRAFTS_SUCCESS: {
      return {
        ...state,
        aircrafts: action.aircrafts,
        load: false
      };
    }

    case LOAD_PROGRESS: {
      return {
        ...state,
        load: true,
      }  
    }

    case AIRCRAFTS_SEARCH: {
      return {
        ...state,
        aircrafts: action.aircrafts,
        load: false,
      }
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