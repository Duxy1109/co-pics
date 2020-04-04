import React, { Component, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TextInput
} from "react-native";
import { Header } from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from "react-native-aws3";

export default function AddSessionModal (props) {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [IDerror, setIDError] = useState("");

  const selectPhoto = () => {
    const options = {
        title: 'Import Photo',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo by Camera', 
        chooseFromLibraryButtonTitle: 'Choose Photo from Album', 
        cameraType: 'back',
        mediaType: 'photo',
        videoQuality: 'high', 
        durationLimit: 10, 
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8, 
        angle: 0,
        allowsEditing: false, 
        noData: false,
        storageOptions: {
            skipBackup: true  
        }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        setImage(response.uri);
      }
    });
  };

  const clearInput=()=> {
    setImage("");
    setText("");
    setError("");
    setIDError("");
    setSessionID("");
  };

  const update_db= (photoname, sessionname)=> {
    console.log("updating session db");
    // console.log(props.uid);

    var data = {
      photo: photoname,
      name: sessionname,
      filter: "0"
    };

    fetch("http://protected-anchorage-99893.herokuapp.com/sessions",
      {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
      body: JSON.stringify(data)
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log("updated session db");
        update_db2(responseJson.id,photoname);
      })
      .catch((error) => {
        console.log(error);
        setError("An Error Occured");
      });

    // props.onSetVisable();
    // clearInput();
  };

  const update_db2= (sessionid,photoname)=> {
    console.log("updating map db");

    var data = {
      user:props.uid,
      session: sessionid
    };

    // console.log(data);

    fetch("http://protected-anchorage-99893.herokuapp.com/maps",
      {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
      body: JSON.stringify(data)
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log("updated map db");
        // console.log(responseJson);
        props.navigation.navigate("Edit", {
          sessionID: responseJson.session,
          photo: photoname
        })
        props.onSetVisable();
        clearInput();
      })
      .catch((error) => {
        console.log(error);
        setError("An Error Occured");
      });

  };

  const find_session = () =>{
    console.log("find photo name for session ID");
    fetch('http://protected-anchorage-99893.herokuapp.com/sessions/'+sessionID, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        update_db2(sessionID,responseJson.photo);
      })
      .catch((error) => {
        console.log(error);
        setIDError("An Error Occured");
      });
  };

  const find_map = ()=>{
    console.log("check if session already added");
    
    fetch('http://protected-anchorage-99893.herokuapp.com/maps/', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        var found = 0;
        var alreadyin = 0;

        for (var i = 0; i < responseJson.length; i++) {
          var item = responseJson[i];
          if (item.session == sessionID){
            found = 1;
          }
          if (item.user == props.uid && item.session == sessionID){
            alreadyin = 1;
            break;
          }
        }
        clearInput();
        if (found == 0){
          setIDError("This Session Number Does Not Exist");
        }else if (alreadyin == 1){
          setIDError("This Session is Already in The List");
        }else{
          find_session();
        }
      })
      .catch((error) => {
        console.log(error);
        setIDError("An Error Occured");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const add_session= ()=> {
    console.log("add_session");
    // const uid = this.props.uid;
    if (sessionID != ""){
      find_map();
    }else if (image == "" || text == ""){
      clearInput();
      setError("Please fill in Photoname And select a photo below");
      // return;
    }else {
      console.log("saving image");
      // upload image to s3
      var imageUri = image;
      const uriSplit = imageUri.split(".");
      const ext = uriSplit[uriSplit.length - 1];
      const photoname = text.split(" ").join("_") + "." + ext;
      const type = "image/" + ext;
      
      const imagefile = {
        name: photoname,
        type: type,
        uri: imageUri
      };
      // console.log(imagefile);

      const options = {
        bucket: "AAA",
        region: "BBB",
        accessKey: "CCC",
        secretKey: "DDD",
        successActionStatus: 201
      };

      RNS3.put(imagefile, options).then(response => {
        if (response.status !== 201){
          setError("save image failed! Might be S3 server problem");
        }else{
          console.log("save image to cloud finished");
          // call post log api
          update_db(photoname, text);
        }
      });
    }
  };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visable}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.modalBody}>
            <Header
              leftComponent={
                <Button
                  title="Cancel"
                  color="white"
                  onPress={() => {
                    props.onSetVisable();
                    clearInput();
                  }}
                />
              }
              centerComponent={
                <Text style={styles.headerCenterText}>Add New Session</Text>
              }
              rightComponent={
                <Button
                  title="Add"
                  color="white"
                  onPress={() => {
                    add_session();
                  }}
                />
              }
              containerStyle={{
                backgroundColor: '#5ACFCF'
              }}
            />
            <View style={styles.modalContent}>
            <Text style={styles.orText}>Please Enter a Session ID or Create a New Session</Text>
            <View style={styles.textInputContainer}>
                <Text style={styles.photoText}>Enter a Session ID:</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={sessionID => {
                    setSessionID(sessionID);
                  }}
                  value={sessionID}
                  // multiline
                />
              <Text style={styles.errorText}>{IDerror}</Text>
              </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.photoText}>New Session Name:</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => {
                    setText(text);
                  }}
                  value={text}
                  // multiline
                />
              <Text style={styles.errorText}>{error}</Text>
              </View>
              <View style={styles.uploadImage}>
                <Button
                  title="Pick an image from camera roll"
                  onPress={selectPhoto}
                  color= "#5ACFCF"
                />
                <View>
                  {image!="" && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 400, height: 300 }}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalBody: {
    backgroundColor: "#f2f2f2",
    flex: 1
  },
  headerCenterText: {
    fontSize: 20,
    color: "white"
  },
  photoText: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 20,
    color: "#5ACFCF"
  },
  orText: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 15,
    color: "#5ACFCF"
  },
  errorText: {
    marginHorizontal: 10,
    marginVertical: 10,
    color: "red",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    margin: 5,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "stretch"
  },
  uploadImage: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 0
  },
  textInputContainer: {
    alignItems: "stretch"
  },
  textInput: {
    height: 40,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "white",
    fontSize: 16
  }
});