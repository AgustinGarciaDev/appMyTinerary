import React, { useEffect } from 'react';
import { ThemeProvider } from 'react-native-elements';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import mainReducer from './ReduxStore/Reducer/mainReducer'
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './navigation/Drawer';
import Toast from 'react-native-toast-message';


const miStore = createStore(mainReducer, applyMiddleware(thunk))

const App = () => {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })



  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={miStore}>
        <ThemeProvider>
          <NavigationContainer>
            <Drawer />
          </NavigationContainer>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </ThemeProvider>
      </Provider>
    );
  }

}

export default App