import {combineReducers} from "redux";
import heroes, * as heroesSelectors from './heroes';
import { GeneralState } from "../interfaces";

export default combineReducers({
  heroes,
})

export const getHeroesData = (state: GeneralState): Object => heroesSelectors.getData(state.heroes)
export const getHeroesIsFetching = (state: GeneralState): Object => heroesSelectors.getIsFetching(state.heroes)
export const getHeroesError = (state: GeneralState): Object => heroesSelectors.getError(state.heroes)