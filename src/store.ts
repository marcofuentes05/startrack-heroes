import { createStore, applyMiddleware, compose } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import mainSaga from './sagas';

export const configureState = () => {
  const sagaMiddleware = createSagaMiddleware();

  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducer);

  let composeEnhancers = compose;
  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = composeEnhancers(applyMiddleware(sagaMiddleware))(createStore)(
    persistedReducer,
  );
  let persistor = persistStore(store);

  sagaMiddleware.run(mainSaga);
  return { store, persistor };
};
