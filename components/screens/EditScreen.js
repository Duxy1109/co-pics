import React, {Component, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight} from "react-native";
import ShowPic from './ShowPic'
import OriginImage from "./image/photo7.jpg"
import {
    ActionCable,
    Cable,
} from '@kesha-antonov/react-native-action-cable'

const { width, height } = Dimensions.get('window');

export default class EditScreen extends Component {
  constructor(props) {
    super(props);

    console.log(props.navigation.getParam("photo"));
    console.log(props.navigation.getParam("sessionID"));

    this.state = {
        turnOn: true,
        turnOff: false,
        S:0,
        picture: "",
        session: ""
    };
    
    this.state.picture = props.navigation.getParam("photo")
    this.state.session = props.navigation.getParam("sessionID")
    this.state.filterItem = [
        {title: "Empty", filterNo:0},
        {title: "Bright", filterNo:4},
        {title: "Warm", filterNo:5},
        {title: "Cool", filterNo:6},
        {title: "Grayscale", filterNo:1},
        {title: "ColorMatrix", filterNo:2},
        {title: "Tint", filterNo:3},]
    }

    componentDidMount(){
        //get filter
        console.log("get current session info");
        fetch('http://protected-anchorage-99893.herokuapp.com/sessions/'+this.state.session, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
            this.setState({S:responseJson.filter});
        })
        .catch((error) => {
            console.log(error);
        });

        //connect cable
        const actionCable = ActionCable.createConsumer('http://protected-anchorage-99893.herokuapp.com/cable');
        this.cable = new Cable({});
        const channel = this.cable.setChannel(
            'session_'+this.state.session, // channel name to which we will pass data from Rails app with `stream_from`
            actionCable.subscriptions.create({
              channel: 'SessionsChannel', // from Rails app app/channels/chat_channel.rb
              id: this.state.session
            })
          )
        
          channel
            .on( 'receive', this.handleReceived )
    }

    componentWillUnmount(){
        console.log("unmount");
        const channelName = 'session_'+this.state.session
        const channel = this.cable.channel(channelName)
        if (channel) {
        channel
            .removeListener( 'receive', this.handleReceived )
        channel.unsubscribe()
        delete( this.cable.channels[channelName] )
}
    }

    handleReceived = (data) =>{
        console.log("received update");
        this.setState({S:data.filter});
    }

    changefilter(filterNo){
        this.setState({S:filterNo});
        this.cable.channel('session_'+this.state.session).perform('receive', { id:this.state.session, filter: filterNo });
    }

    renderFilter() { 
      return (
        <View style={styles.moduleBox}>
          <FlatList
              data={this.state.filterItem}
              keyExtractor={(item, index) => index}
              renderItem={this.renderFilterItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
      </View>
      );
    }

    renderFilterItem = ({ item }) => {
      return (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {this.changefilter(item.filterNo);}}
          >
            <Text style={styles.filterText}> {item.title} </Text>
            <View style={styles.sectionContainer}>
                    <ShowPic
                        image={OriginImage}
                        selectedFilter={item.filterNo}
                    />
                </View>
          </TouchableOpacity>
         </View>
       )
    }

    render(){
      return (
          <View style={styles.container}>
            <View>
                <Text style={styles.header}>Pick Your Favorate Filter </Text>
                {/* <Image source={OriginImage} style={styles.testImage}></Image> */}
            </View>
            <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <ShowPic
                  image={{uri:"https://co-pics.s3.amazonaws.com/"+this.state.picture}}
                  selectedFilter={this.state.S}
              />
                </View>
                {this.renderFilter()}
            </View>
        </View>
      );
    }
  };
  
  const styles = StyleSheet.create({
      moduleBox: {
        top:180,
        alignItems:'center'
      },
      header: {
          fontWeight: 'bold',
          fontSize: 25,
          alignItems: "center"
      },
      filterText: {
          fontSize: 20,
          textAlign:'center',
          justifyContent: "center",
          alignItems: "center"
      },
      testImage: {
        height:height/2,
        width:width/2,
      },
      container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch"
      },
      filterContainer: {
        width:width/2,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch"
      }
  });