import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";


const MiddleScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Wait For Development</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
    alignItems: "center"
  },
});

export default MiddleScreen;
