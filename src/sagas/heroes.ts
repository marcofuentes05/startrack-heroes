import {call, takeEvery, put} from 'redux-saga/effects';

import * as actions from '../actions/heroes';
import * as types from '../types/heroes';

const URL ='https://cors-anywhere.herokuapp.com/https://akabab.github.io/superhero-api/api/all.json'

function* fetchHeroesStart(){
  try {
    const {response} = yield call(
      fetch,
      URL,
    );
    console.log(response);
    yield put(actions.fetchHeroesSucceeded(response));
  } catch(error) {
    yield put(actions.fetchHeroesSucceeded(error));
  }
}

export function* watchFetchHeroesStart(){
  yield takeEvery(types.FETCH_HEROES_STARTED, fetchHeroesStart);
}