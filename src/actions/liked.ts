import * as types from '../types/liked';
import { Action } from '../interfaces'

export const likeHero = (id: number) : Action => ({
  type: types.LIKE_HERO,
  payload: id,
})
export const dislikeHero = (id: number) : Action => ({
  type: types.DISLIKE_HERO,
  payload: id,
})

export const collapseLiked = (): Action => ({
  type: types.COLLAPSE_LIKED,
  payload: {},
})
