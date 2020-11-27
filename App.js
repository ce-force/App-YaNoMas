import React from "react";
import Login from "./src/screens/login/Login";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import Register from "./src/screens/login/Register";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import { firebaseConfig } from "./config/FirebaseConfig";
import TabNavigator from "./src/components/TabNavigator";
import AccountScreen from "./src/screens/Settings/AccountSettings";
import NotificationsSettings from "./src/screens/Settings/NotificationsSettings";
import LocationSettings from "./src/screens/Settings/LocationSettings";
import currentTheme from "./src/constants/Theme";

import { UserContext, UserProvider } from "./src/communication/UserContext";
import CircleScreen from "./src/screens/CircleScreen2";

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState({
    isLoggedIn: false,
  });

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          mode="card"
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Register"
            component={Register}
            screenOptions={{ headerShown: true }}
          />
          <Stack.Screen
            name="NotificationsSettings"
            component={NotificationsSettings}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="CircleManagement"
            component={CircleScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="LocationSettings"
            component={LocationSettings}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="PrivacySetings"
            component={LocationSettings}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={{
              headerShown: true,
              headerTitle: "Confguración de la Cuenta",
              headerTintColor: currentTheme.COLORS.DEFAULT,
            }}
          />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
