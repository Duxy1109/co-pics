import React , { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  PanResponder
} from 'react-native';
import Navigator from "./components/navigators/TabNavigator";

export default function App(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
    
  const reset = () => {
    setError("");
    setPassword("");
    setConfirm("");
    setName("");
  };

  const logIn = () => {
    console.log("logging in for " + phone);
    fetch('http://protected-anchorage-99893.herokuapp.com/users/'+phone, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //  console.log(responseJson);
         if (responseJson.length >1){
          reset();
          setError("Please Put In Phone Number");
         }else if (responseJson.password == password){
          reset();
          setLoggedIn(true);
         }else{
          reset();
          setError("Invalid Phone or Password");
         }
      })
      .catch((error) => {
        console.log(error);
        setError("An Error Occured");
      });
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  const startSignUp = () => {
    setSignUp(true);
    reset();
  };

  const cancel = () => {
    setSignUp(false);
    reset();
  };

  const signUpPressed = () => {
    if (phone == "" || password == "" || name == ""){
      setError("Please Fill in Each Form")
      return;
    }
    if (password != confirm) {
      setError("Password mismatch");
      return;
    }

    var data = {
      phone: phone,
      name: name,
      password: password
      };

      fetch("http://protected-anchorage-99893.herokuapp.com/users",
      {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
      body: JSON.stringify(data)
      }).then((response) => response.json())
      .then((responseJson) => {
        //  console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
        setError("An Error Occured");
      });

    setLoggedIn(true);
    setSignUp(false);
    reset();
  };

  if (loggedIn) {
    return (
      <View style={{ flex: 1 }}>
        <Navigator screenProps={{ uid: phone, logOut: logOut }} />
      </View>
    );
  }else if (signUp){
    return (
      <ScrollView
        contentContainerStyle={styles.loginView}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.logoSignup}>CoPics</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone"}
          style={styles.inputField}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={"Name"}
          style={styles.inputField}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
          style={styles.inputField}
        />
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder={"Confirm password"}
          style={styles.inputField}
        />
        <TouchableOpacity
          onPress={signUpPressed}
          style={styles.signupViewButton}
          activeOpacity={0.8}
        >
          <Text style={styles.signinButtonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Cancel" onPress={cancel} color="grey" />
      </ScrollView>
    );
  }else{
    return (
      <ScrollView
        contentContainerStyle={styles.loginView}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.logoLogin}>CoPics</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone"}
          style={styles.inputField}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
          style={styles.inputField}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={logIn}
            style={styles.signinButton}
            activeOpacity={0.8}
          >
            <Text style={styles.signinButtonText}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.signupButtonContainer}>
            <Button title="Sign up" onPress={startSignUp} color="grey" />
          </View>
        </View>
        <Text style={{ color: "red" }}>{error}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logoLogin: {
    fontSize: 55,
    marginBottom: 100,
    color: "#71D2D2"
  },
  logoSignup: {
    fontSize: 55,
    marginBottom: 50,
    color: "#71D2D2"
  },
  loginView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    paddingHorizontal: 50
  },
  inputField: {
    backgroundColor: "white",
    width: "90%",
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 40,
    fontSize: 16
  },
  signinButton: {
    marginTop: 20,
    backgroundColor: "#5ACFCF",
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  signupViewButton: {
    marginTop: 20,
    backgroundColor: "#5ACFCF",
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  signinButtonText: {
    color: "white",
    fontSize: 18
  },
  signupButtonContainer: {
    marginTop: 10
  }
});

