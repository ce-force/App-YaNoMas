import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";

// screens
import Circle from '../screens/circle/Circle';
import CircleRequests from '../screens/circle/CircleRequests';
import Emergency from '../screens/emergency/Emergency';
import Login from '../screens/login-view/Login';
import Register from '../screens/login-view/Register';
import User from '../screens/user/Profile';

// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


function ElementsStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Elements"
          component={Elements}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Elements" navigation={navigation} scene={scene} />
            ),
            cardStyle: { backgroundColor: "#F8F9FE" }
          }}
        />
              <Stack.Screen
          name="Pro"
          component={Pro}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                title=""
                back
                white
                transparent
                navigation={navigation}
                scene={scene}
              />
            ),
            headerTransparent: true
          }}
        />
      </Stack.Navigator>
    );
  }

  function ProfileStack(props) {
    return (
      <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                transparent
                white
                title="Profile"
                navigation={navigation}
                scene={scene}
              />
            ),
            cardStyle: { backgroundColor: "#FFFFFF" },
            headerTransparent: true
          }}
        />
              <Stack.Screen
          name="Pro"
          component={Pro}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                title=""
                back
                white
                transparent
                navigation={navigation}
                scene={scene}
              />
            ),
            headerTransparent: true
          }}
        />
      </Stack.Navigator>
    );
  }

  export default function OnboardingStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="none">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          option={{
            headerTransparent: true
          }}
        />
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    );
  }
  
  function AppStack(props) {
    return (
      <Drawer.Navigator
        style={{ flex: 1 }}
        drawerContent={props => <CustomDrawerContent {...props} />}
        drawerStyle={{
          backgroundColor: "white",
          width: width * 0.8
        }}
        drawerContentOptions={{
          activeTintcolor: "white",
          inactiveTintColor: "#000",
          activeBackgroundColor: "transparent",
          itemStyle: {
            width: width * 0.75,
            backgroundColor: "transparent",
            paddingVertical: 16,
            paddingHorizonal: 12,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            overflow: "hidden"
          },
          labelStyle: {
            fontSize: 18,
            marginLeft: 12,
            fontWeight: "normal"
          }
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Profile" component={ProfileStack} />
        <Drawer.Screen name="Account" component={Register} />
        <Drawer.Screen name="Elements" component={ElementsStack} />
        <Drawer.Screen name="Articles" component={ArticlesStack} />
      </Drawer.Navigator>
    );
  }