import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from "react-native";

import SessionItem from "./SessionItem";

const SessionList = props => {
  const [sessionDataList, setsessionDataList] = useState([]);

const get_log = query => {
    console.log("get log");
    fetch('http://protected-anchorage-99893.herokuapp.com/maps/', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        var items = [];
        for (var i = 0; i < responseJson.length; i++) {
          var item = responseJson[i];
          if (item.user == query){
            items.push(item);
          }
        }
        // console.log(items);
        if (sessionDataList.length == 0 && items.length!=0){
          setsessionDataList(items);
        }
        if (sessionDataList.length != 0 &&
          items[items.length-1].session != sessionDataList[sessionDataList.length-1].session){
          setsessionDataList(items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => get_log(props.uid));
  
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => item.user + item.session}
        data={sessionDataList}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <SessionItem sessionData={itemData} navigation={props.navigation} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#eee"
  },
  listItem: {}
});

export default SessionList;
