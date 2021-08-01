import * as types from '../types/liked';
import {Action} from '../interfaces';

/*
LIKED: [ids]
*/

const liked = (state=[], action:Action) => {
  switch (action.type) {
    case types.LIKE_HERO: {
      if (!state.length) {
        return [action.payload];
      }
      if (state.includes(action.payload)) {
        return state;
      }
      return [...state, action.payload];
    }
    case types.RESET_LIKES: {
      return [];
    }
    case types.DISLIKE_HERO: {
      return state.filter(value => value !== action.payload )
    }
    default: {
      return state;
    }
  }
}

export default liked

export const getLikedIds = (state) => state;