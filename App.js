import React from 'react';
import Home from './Page/Home'
import Cities from './Page/Cities'
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import mainReducer from './ReduxStore/Reducer/mainReducer'
import SignIn from './Page/SignIn';
import SignUp from './Page/SignUp';


const miStore = createStore(mainReducer, applyMiddleware(thunk))

export default function App() {
  return (

    <Provider store={miStore}>
      {/* <Home />  */}
      {/*  <Cities /> */}
      {/* <SignIn /> */}
      <SignUp />
    </Provider>
  );
}

