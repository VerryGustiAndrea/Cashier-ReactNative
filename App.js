import React from 'react';
import MainNavigators from './src/public/navigators/MainNavigators';
import Login from './src/screens/Login';
// import {Provider} from 'react-redux'
// import store from './src/redux'
console.disableYellowBox = true;

const App = () => {
  return (
    // <Provider store={store}>
    // <MainNavigators />
    // </Provider>

    <Login />
  );
};

export default App;
