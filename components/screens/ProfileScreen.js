import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import ProfileTopBanner from "../profile/ProfileTopBanner";
import SettingList from "../profile/SettingList";

const ProfileScreen = props => {

  const [userData, setuserData] = useState({
    name: "loading",
    phone: "loading"
  });
  
  useEffect(() => get_user(props.screenProps.uid, userData, setuserData));

  return (
    <View style={styles.container}>
      <ProfileTopBanner userData={userData} />
      <SettingList
        onLogOut={props.screenProps.logOut}
        userData={userData}
        navigation={props.navigation}
        resetuserData = {setuserData}
      />
    </View>
  );
};


const get_user = (query, userData, setuserData) => {
  console.log("profile page for " + query);
  fetch('http://protected-anchorage-99893.herokuapp.com/users/'+query, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      if (responseJson.name != userData.name || responseJson.phone != userData.phone){
        setuserData(responseJson);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  profileTilesContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 5
  },
  profileTilesRow: {
    flexDirection: "row"
  },
  profileTile: {
    flex: 1
  }
});

export default ProfileScreen;
