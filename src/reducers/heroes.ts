import * as types from '../types/heroes';
import {combineReducers} from 'redux';
import {Action, HeroesState} from '../interfaces';

/*
heroes: {
  data,
  isFetching,
  error,
}
*/

const data = (state=[], action: Action): Object => {
  switch (action.type) {
    case types.FETCH_HEROES_SUCCEEDED: {
      return action.payload;
    }
    // case likeTypes.LIKE_HERO: {
      // return state.filter(value => value.id !== action.payload)
    // }
    default: {
      return state;
    }
  }
}

const dataObjects = (state={}, action: Action): Object => {
  switch (action.type) {
    case types.FETCH_HEROES_SUCCEEDED: {
      const newState = {};
      action.payload.map(value => {
        newState[value.id] = value;
        return 1;
      });
      return newState;
    }
    default: {
      return state;
    }
  }
}

const isFetching = (state=false, action: Action): Object => {
  switch (action.type) {
    case types.FETCH_HEROES_STARTED: {
      return true
    }
    case types.FETCH_HEROES_SUCCEEDED:
    case types.FETCH_HEROES_FAILED: {
      return false
    }
    default: {
      return state
    }
  }
}

const error = (state={}, action: Action) : Object => {
  switch (action.type) {
    case types.FETCH_HEROES_FAILED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  data,
  isFetching,
  error,
  dataObjects,
});

export const getData = (state: HeroesState): Object => state.data;
export const getDataObject = (state, id): Object => state.dataObjects[id];
export const getIsFetching = (state: HeroesState):Object => state.isFetching;
export const getError = (state: HeroesState):Object => state.error;