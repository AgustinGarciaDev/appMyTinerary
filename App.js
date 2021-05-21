import React from 'react';
import Home from './Page/Home'
import Cities from './Page/Cities'
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import mainReducer from './ReduxStore/Reducer/mainReducer'
import AppLoading from 'expo-app-loading';
import SignIn from './Page/SignIn';
import SignUp from './Page/SignUp';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './navigation/Drawer';
import Toast from 'react-native-toast-message';
const miStore = createStore(mainReducer, applyMiddleware(thunk))

export default function App() {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={miStore}>
        <NavigationContainer>
          <Drawer />
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    );
  }

}

