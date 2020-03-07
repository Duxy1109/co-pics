import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const ProfileEditScreen = props => {
  const [inputValue, setInputValue] = useState(
    props.navigation.getParam("value")
  );

  const key = props.navigation.getParam("key");
  const onSave = props.navigation.getParam("onSave");
  const resetuserData = props.navigation.getParam("resetuserData");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setInputValue(text)}
        value={inputValue}
      />
      <Button
        title="Save"
        onPress={() => {
          onSave({
            key: key,
            value: inputValue
          });
          resetuserData({
            key: key,
            value: "loading"
          });
          props.navigation.navigate("Profile");
        }}
        color="#5ACFCF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 15
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20
  }
});

export default ProfileEditScreen;
