import {combineReducers} from "redux";
import heroes, * as heroesSelectors from './heroes';
import liked, * as likedSelectors from './liked';
import collapsed from './collapsed';
import { GeneralState } from "../interfaces";

export default combineReducers({
  heroes,
  liked,
  collapsed,
})

export const getHeroesData = (state: GeneralState): Object => heroesSelectors.getData(state.heroes)
export const getHeroesDataObject = (state: GeneralState, id: number): Object => heroesSelectors.getDataObject(state.heroes, id)
export const getHeroesIsFetching = (state: GeneralState): Object => heroesSelectors.getIsFetching(state.heroes)
export const getHeroesError = (state: GeneralState): Object => heroesSelectors.getError(state.heroes)

export const getLikedIds = (state: GeneralState) => likedSelectors.getLikedIds(state.liked)
export const getLikedObjects = (state: GeneralState) => likedSelectors.getLikedIds(state.liked).map((value: number) => getHeroesDataObject(state, value))
export const getLikedLength = (state: GeneralState) =>likedSelectors.getLikedIds(state.liked).length

export const getCollapsed = (state: GeneralState) => state.collapsed;
