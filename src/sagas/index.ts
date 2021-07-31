import {fork, all} from 'redux-saga/effects';

import { watchFetchHeroesStart } from './heroes';

function* mainSaga() {
  yield all([
    fork(watchFetchHeroesStart),
  ]);
}

export default mainSaga;