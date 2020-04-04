import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity  } from "react-native";

const SessionItem = props => {
  const [sessionName, setsessionName] = useState("");
  const [photoName, setphotoName] = useState("");
  const [createTime, setcreateTime] = useState("");

const get_session = query => {
    console.log("get each log");
    fetch('http://protected-anchorage-99893.herokuapp.com/sessions/'+props.sessionData.item.session, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        if(responseJson.name!= sessionName || responseJson.photo!=photoName || responseJson.created_at!=createTime){
          setsessionName(responseJson.name);
          setphotoName(responseJson.photo);
          setcreateTime(responseJson.created_at);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => get_session(props.uid));

    return (
      <TouchableOpacity activeOpacity={0.7}
      onPress={() =>
        props.navigation.navigate("Edit", {
          sessionID: props.sessionData.item.session,
          photo: photoName
        })
      }>
      <View style={styles.container}>
        <View style={styles.sessionBody}>
          <View style={styles.header}>
            <Text style={styles.sessionName}>Session Name : {sessionName}</Text>
            <Text>{"  "}</Text>
            <Text style={styles.userId}>{"session_id@" + props.sessionData.item.session}</Text>
          </View>
          <View>
            <View style={styles.sessionImageContainer}>
              <Image
                source={{
                  uri:
                    "https://co-pics.s3.amazonaws.com/"+photoName
                }}
                style={styles.sessionImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{ color: "#888" }}>{createTime}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: "flex-start"
  },
  sessionBody: {
    paddingTop: 5,
    paddingLeft: 25,
    flex: 1
  },
  header: {
    flexDirection: "row",
    marginVertical: 3
  },
  sessionName: {
    fontWeight: "bold"
  },
  userId: {
    color: "grey"
  },
  sessionContent: {
    marginVertical: 3
  },
  sessionImageContainer: {
    height: 180
  },
  sessionImage: {
    flex: 1,
    width: 300,
    marginVertical: 3
  },
  footer: {
    marginVertical: 3,
    alignItems: "flex-end",
    paddingRight: 10
  }
});

export default SessionItem;
