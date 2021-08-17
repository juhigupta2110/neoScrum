import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

import store from './app/redux/store';
import NeoScrumApp from './app/neoScrumApp';
import NeoScrumStackNav from './app/neoScrumStackNav';
import NeoScrumTabNav from './app/neoScrumTabNav';
import NeoScrumDrawerNav from './app/neoScrumDrawerNav';
import NeoScrumAppNew from './app/neoScrumAppNew';

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = '';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <NeoScrumApp />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
