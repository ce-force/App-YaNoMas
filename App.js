import React, { useEffect } from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';

import {RootStack} from './navigation/Sreens'
import * as firebase from "firebase";
import {firebaseConfig} from "./config/FirebaseConfig";

// Initialize firebase app once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const App = () => {

  return (
      <NavigationContainer>
        <RootStack/>
      </NavigationContainer>
  );
};

export default App;
