import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './src/screens/Home'
import ShowScreen from './src/screens/Show'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

const initialState = {
  shows: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_SHOWS`: {
      return {
        ...state,
        shows: action.shows
      }
    } 
    default: 
      return state
  }
}

const store = createStore(reducer);

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Show: {
    screen: ShowScreen
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
})

const AppContainer = createAppContainer(AppNavigator);

export default () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
};
