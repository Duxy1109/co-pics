

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableHighlight
} from 'react-native';

import ShowPic from './ShowPic'
import OriginImage from "./image/photo8.jpg"

export default class EditScreen extends Component {
  constructor(props){
    super(props);
    console.log(props.navigation.getParam("photo"))
    console.log(props.navigation.getParam("sessionID"))
    this.state = {
      S:0,
      picture: ""
    //   session_id: props.navigation.getParam("sessionID")
    };
    this.state.picture = props.navigation.getParam("photo")
  }

  render(){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Pick up your favorate filter {this.state.filter}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.sectionContainer}>
                    <ShowPic
                        image={{uri:"https://co-pics.s3.amazonaws.com/"+this.state.picture}}
                        selectedFilter={this.state.S}
                    />
                </View>
                <View style={styles.profileTilesContainer}>
                    <View style={styles.profileTilesRow}>
                        <View>
                            <Button 
                                title="Empty"
                                onPress={() => {this.setState({S:0});}}
                            />
                        </View>
                        <View>
                            <Button 
                                title="Grayscale"
                                onPress={() => {this.setState({S:1});}}
                            />
                        </View>
                        <View>
                            <Button 
                                title="ColorMatrix"
                                onPress={() => {this.setState({S:2});}}
                            />
                        </View>
                        <View>
                            <Button 
                                title="Tint"
                                onPress={() => {this.setState({S:3});}}
                            />
                        </View>
                        
                    </View>
                </View>
            </View>
        </View>
    );
  }
};

const styles = StyleSheet.create({
    stretch: {
        width: 420,
        height: 200,
        resizeMode: 'stretch',
        backgroundColor: "white",
      },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: "center",
    },
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    profileTilesContainer: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 5
      },
      profileTilesRow: {
        flexDirection: "row",
        alignItems: "center",
      },
      profileTile: {
        flex: 1
      }
});
