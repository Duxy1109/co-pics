import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

import SessionList from "../home/SessionList";
import AddSessionModel from "../home/AddSessionModel";

export default function HomeScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const switchModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <SessionList 
        uid={props.screenProps.uid}
        navigation={props.navigation} />
      <AddSessionModel
        visable={modalVisible}
        onSetVisable={switchModalVisible}
        uid={props.screenProps.uid}
        navigation={props.navigation}
      />
      <ActionButton
        buttonColor="#5ACFCF"
        title="Add Post"
        onPress={() => {
          //Todo: Create A New Session
          setModalVisible(true);
          console.log("ActionButton Add Session")
        }}
      >
        <Icon name="md-done-all" style={styles.actionButtonIcon} />
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
