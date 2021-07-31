export interface Action {
  type: string,
  payload: Object,
}

export interface HeroesState {
  data: Object,
  isFetching: Boolean,
  error: Object,
}

export interface GeneralState {
  heroes: HeroesState,
}