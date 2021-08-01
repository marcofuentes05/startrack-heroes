export interface Action {
  type: string,
  payload: Object,
}

export interface HeroesState {
  data: Object,
  dataObjects: Object,
  isFetching: Boolean,
  error: Object,
}

export interface GeneralState {
  heroes: HeroesState,
  liked: [number],
  collapsed: boolean,
}

export interface PowerStats {
  intelligence: number,
  strength: number,
  speed: number,
  durability: number,
  power: number,
  combat: number
}