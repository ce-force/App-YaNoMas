import React from "react";
import Login from "./src/screens/login/Login";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import Register from "./src/screens/login/Register";
import { NavigationContainer } from "@react-navigation/native";
import { firebaseConfig } from "./config/FirebaseConfig";
import TabNavigator from "./src/components/TabNavigator";
import AccountScreen from "./src/screens/Settings/AccountSettings";
import NotificationsSettings from "./src/screens/Settings/NotificationsSettings";
import CircleManagement from "./src/screens/Settings/CircleManagement";
import LocationSettings from "./src/screens/Settings/LocationSettings";
import currentTheme from "./src/constants/Theme";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="card"
        initialRouteName="TabNavigator"
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
          component={CircleManagement}
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
  );
};

export default App;
