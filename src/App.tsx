import React from 'react';
import './App.scss';

import {Provider} from 'react-redux'
import {configureState} from './store';
import {PersistGate} from 'redux-persist/integration/react'
import Heroes from './Components/Heroes'
import Liked from './Components/Liked'

import logo from './assets/logo/logo.svg';

const {store, persistor} = configureState();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <div className="App container-fluid ">
          <div className="row">
            <img alt="" src={logo} className="logo" />
          </div>
          <Liked />
          <Heroes />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
