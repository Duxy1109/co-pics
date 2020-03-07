import React from "react";
import { Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeStackNavigator from "./HomeStackNavigator";
import MiddleStackNavigator from "./MiddleStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: "Edit",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="md-brush" size={24} />
        ),
        tabBarOptions: {
          activeTintColor: '#5ACFCF',
        }
      }
    },
    Middle: {
      screen: MiddleStackNavigator,
      navigationOptions: {
        tabBarLabel: "To Be Continued...",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="ios-question" size={24} />
        ),
        tabBarOptions: {
          activeTintColor: '#5ACFCF',
        }
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="ios-person" size={24} />
        ),
        tabBarOptions: {
          activeTintColor: '#5ACFCF',
        }
      }
    }
  },
  {
    // router config
    initialRouteName: "Home",
    order: ["Home", "Middle", "Profile"],
    // navigation options
    navigationOptions: {},
    tabBarOptions: {}
  }
);

export default createAppContainer(TabNavigator);
