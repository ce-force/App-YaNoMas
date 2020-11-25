import React from "react";
import Login from "./src/screens/login/Login";
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Register from "./src/screens/login/Register";
import {
    NavigationContainer,
} from '@react-navigation/native';
import * as firebase from "firebase";
import {firebaseConfig} from "./config/FirebaseConfig";
import TabNavigator from "./src/components/TabNavigator";
import AccountScreen from "./src/screens/Settings/AccountScreen";

// Initialize firebase app once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator mode="card"
                initialRouteName="Login"
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register}
                              screenOptions={{headerShown: true}}/>
                <Stack.Screen name='AccountScreen' component={AccountScreen} />
                <Stack.Screen name='TabNavigator' component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
