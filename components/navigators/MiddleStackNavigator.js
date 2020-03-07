import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import MiddleScreen from "../screens/MiddleScreen";

const MiddleStackNavigator = createStackNavigator({
  middle: {
    screen: MiddleScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Middle View"
    })
  }
});

export default MiddleStackNavigator;
