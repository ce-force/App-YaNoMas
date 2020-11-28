import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import Theme from "../constants/Theme";
import SettingsScreen from "../screens/SettingsScreen";
import CrimesScreen from "../screens/CrimesScreen";
import CircleScreen from "../screens/CircleScreen2";
import InformationScreen from "../screens/InformationScreen";
import StatsScreen from "../screens/StatsScreen";

const Tab = createBottomTabNavigator();

Tab.tabBarOptions = {
  activeTintColor: Theme.COLORS.DEFAULT,
  inactiveTintColor: Theme.COLORS.GRAY,
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Crimenes") {
            iconName = focused ? "fire" : "fire";
          } else if (route.name === "Estadisticas") {
            iconName = focused ? "chart-bar" : "chart-bar";
          } else if (route.name === "Circulo") {
            iconName = focused ? "circle" : "circle-outline";
          } else if (route.name === "Info") {
            iconName = focused ? "information-variant" : "information-variant";
          } else if (route.name === "Configuración") {
            iconName = focused ? "settings" : "settings";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Theme.COLORS.DEFAULT,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Crimenes" component={CrimesScreen} />
      <Tab.Screen name="Estadisticas" component={StatsScreen} />
      <Tab.Screen name="Circulo" component={CircleScreen} />
      <Tab.Screen name="Info" component={InformationScreen} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
