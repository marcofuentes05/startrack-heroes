import * as types from '../types/liked';
import {Action} from '../interfaces';

const collapsed = (state=false, action: Action) => {
  switch (action.type) {
    case types.COLLAPSE_LIKED: {
      return !state;
    }
    default:
      return state
  }
}

export default collapsed;
