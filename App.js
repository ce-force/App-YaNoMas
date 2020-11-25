import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';

import OnboardingStack from './navigation/Sreens'
import * as firebase from "firebase";
import {firebaseConfig} from "./config/FirebaseConfig";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const App = () => {

  return (
      <NavigationContainer>
        <OnboardingStack/>
      </NavigationContainer>
  );
};

export default App;
