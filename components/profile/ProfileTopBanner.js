import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ProfileTopBanner = props => {

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* <Image
          source={{
            uri:
              "https://cloud-project-user-profile-pic.s3.amazonaws.com/" +
              props.userData.profilepic
          }}
          style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
        /> */}
      </View>
      <View style={styles.right}>
        <Text style={styles.userNameText}>{"@"+props.userData.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 200,
    marginBottom: 5
  },
  left: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingLeft: 10
  },
  percentText: {
    fontSize: 60
  },
  leftText: {
    fontSize: 16,
    color: "#444"
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 40,
    flex: 1
  },
  userNameText: {
    fontSize: 28
  },
  userIdText: {
    fontSize: 20,
    color: "#666"
  }
});

export default ProfileTopBanner;
