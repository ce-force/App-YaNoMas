import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';

import OnboardingStack from './navigation/Sreens'

const App = () => {

  return (
      <NavigationContainer>
        <OnboardingStack/>
      </NavigationContainer>
  );
};

export default App;
