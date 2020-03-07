import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Profile"
    })
  },
  ProfileEdit: {
    screen: ProfileEditScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Edit Profile",
      headerTintColor: "#5ACFCF"
    })
  }
});

export default ProfileStackNavigator;
