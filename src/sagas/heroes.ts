import {call, takeEvery, put} from 'redux-saga/effects';

import * as actions from '../actions/heroes';
import * as types from '../types/heroes';

const URL ='https://cors-anywhere.herokuapp.com/akabab.github.io/superhero-api/api/all.json'

function* fetchHeroesStart(){
  try {
    const response = yield call(
      fetch,
      URL,
      {
        method: 'GET',
      }
    );
    if (response.status === 200) {
      const jsonResponse = yield response.json()
      yield put(actions.fetchHeroesSucceeded(jsonResponse));
    } else {
      const jsonResponse = yield response.json()
      yield put(actions.fetchHeroesFailed({
        text: 'Code not 200',
        jsonResponse
      }));
    }
  } catch(error) {
    yield put(actions.fetchHeroesFailed(error));
  }
}

export function* watchFetchHeroesStart(){
  yield takeEvery(types.FETCH_HEROES_STARTED, fetchHeroesStart);
}