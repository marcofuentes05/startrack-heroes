import React from 'react';
import './App.scss';

import {Provider} from 'react-redux'
import {configureState} from './store';
import {PersistGate} from 'redux-persist/integration/react'


const {store, persistor} = configureState();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <div className="App">
          <div className="container">
            <div className="row border">
              <button>Hola</button>
            </div>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
