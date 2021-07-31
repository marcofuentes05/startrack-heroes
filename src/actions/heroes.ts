import * as types from '../types/heroes';

interface Action {
  type: string,
  payload: Object,
}

export const fetchHeroesStarted = () : Action => ({
  type: types.FETCH_HEROES_STARTED,
  payload: {},
})

export const fetchHeroesFailed = (error: string) : Action => ({
  type: types.FETCH_HEROES_FAILED,
  payload: {
    text: error,
  },
})

export const fetchHeroesSucceeded = (data: Object) : Action => ({
  type: types.FETCH_HEROES_SUCCEEDED,
  payload: data,
})
