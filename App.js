import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import HomeScreen from "./src/screens/HomeScreen";
import Theme from "./src/constants/Theme";
import SettingsScreen from "./src/screens/SettingsScreen";
import CrimesScreen from "./src/screens/CrimesScreen";
import CircleScreen from "./src/screens/CircleSceen";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Circle: CircleScreen,
    Crimes: CrimesScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = "home";
        switch (routeName) {
          case "Home":
            iconName = "home";
            break;
          case "Circle":
            iconName = "circle";
            break;
          case "Crimes":
            iconName = "fire";
            break;
          case "Settings":
            iconName = "settings";
            break;
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: Theme.COLORS.DEFAULT,
      inactiveTintColor: Theme.COLORS.GRAY
    }
  }
);

export default createAppContainer(TabNavigator);
