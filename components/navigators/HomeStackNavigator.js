import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import EditScreen from "../screens/EditScreen";
import { Header } from "react-native/Libraries/NewAppScreen";

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "My Co-Pics"
    })
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Edit",
      headerTintColor: "#5ACFCF"
    })
  }
});

export default HomeStackNavigator;
