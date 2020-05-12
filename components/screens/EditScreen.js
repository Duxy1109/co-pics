import React, { Component } from "react";
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import {
  View, Text, StyleSheet, FlatList, AppRegistry,
  Picker,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ShowPic from './ShowPic'
import OriginImage from "./image/photo1.png"
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
      S: 0,
      picture: "",
      session: "",
      feature: "filter",
      color: '#FF0000',
      thickness: 5,
      message: '',
      text:[],
      newtext:{},
      photoPath: null,
      pathcount: 0,
      scrollEnabled: true
    };

    this.state.picture = props.navigation.getParam("photo")
    this.state.session = props.navigation.getParam("sessionID")
    this.state.filterItem = [
      { title: "Empty", filterNo: 0 },
      { title: "Bright", filterNo: 4 },
      { title: "Warm", filterNo: 5 },
      { title: "Cool", filterNo: 6 },
      { title: "Grayscale", filterNo: 1 },
      { title: "ColorMatrix", filterNo: 2 },
      { title: "Tint", filterNo: 3 },]
  }

  componentDidMount() {
    //get filter
    console.log("get current session info");
    fetch('http://localhost:3001/sessions/' + this.state.session, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({ S: responseJson.filter });
      })
      .catch((error) => {
        console.log(error);
      });

    //connect cable
    const actionCable = ActionCable.createConsumer('http://localhost:3001/cable');
    this.cable = new Cable({});
    const channel = this.cable.setChannel(
      'session_' + this.state.session, // channel name to which we will pass data from Rails app with `stream_from`
      actionCable.subscriptions.create({
        channel: 'SessionsChannel', // from Rails app app/channels/chat_channel.rb
        id: this.state.session
      })
    )

    channel
      .on('receive', this.handleReceived)
  }

  componentWillUnmount() {
    console.log("unmount");
    const channelName = 'session_' + this.state.session
    const channel = this.cable.channel(channelName)
    if (channel) {
      channel
        .removeListener('receive', this.handleReceived)
      channel.unsubscribe()
      delete (this.cable.channels[channelName])
    }
  }

  handleReceived = (data) => {
    console.log("received update");
    if (data.type == 'filter') {
      this.setState({ S: data.filter });
    }
    if (data.type == 'paths') {
      new_ids = []
      var i;
      for (i = 0; i < data.paths.length; i++) {
        new_ids.push(data.paths[i]['path']['id'])
      }
      // console.log("new_ids",new_ids)
      old_ids = []
      now_data = this.canvas.getPaths()
      for (i = 0; i < now_data.length; i++) {
        old_ids.push(now_data[i]['path']['id'])
      }
      // console.log("old_ids",old_ids)
      //delete
      for (i = 0; i < old_ids.length; i++) {
        if (new_ids.includes(old_ids[i]) == false) {
          this.canvas.deletePath(old_ids[i])
          // console.log("delete:",old_ids[i])
        }
      }
      //add
      for (i = 0; i < data.paths.length; i++) {
        if (old_ids.includes(data.paths[i]['path']['id']) == false) {
          this.canvas.addPath(data.paths[i])
          // console.log("add:",data.paths[i]['path']['id'])
        }
      }
    }
  }

  changefilter(filterNo) {
    this.setState({ S: filterNo });
    this.cable.channel('session_' + this.state.session).perform('receive', { id: this.state.session, type: 'filter', filter: filterNo });
  }

  changepaths(paths) {
    this.cable.channel('session_' + this.state.session).perform('receive', { id: this.state.session, type: 'paths', paths: paths });
  }

  renderFilter() {
    return (
      <View style={{ height: height / 3, alignItems: "flex-end" }}>
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
          style={styles}
          onPress={() => { this.changefilter(item.filterNo); }}
        >
          <Text style={styles.filterText}> {item.title} </Text>
          <View>
            <ShowPic
              image={OriginImage}
              selectedFilter={item.filterNo}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.feature === "filter" &&
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.functionButton} onPress={() => {
                this.setState({ feature: "draw" })
              }}>
                <Text style={{ color: 'white' }}>Draw</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.functionButton} onPress={() => {
              }}>
                <Text style={{ color: 'white' }}>Save</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.header}> Pick Your Favorate Filter</Text>
            <View style={{top: 30}}>
            <ShowPic
              image={OriginImage}
              // image={{uri:"https://co-pics.s3.amazonaws.com/"+this.state.picture}}
              selectedFilter={this.state.S}
            />
            </View>
            <View style={{ alignItems: "flex-end", height: height/4, top: height/8}}>
              {this.renderFilter()}
            </View>
          </View>
        }
        {
          this.state.feature === "draw" &&
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.functionButton} onPress={() => {
                this.setState({ feature: "filter" })
              }}>
                <Text style={{ color: 'white' }}>Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.functionButton} onPress={() => {
                this.canvas.undo()
              }}>
                <Text style={{ color: 'white' }}>Undo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.functionButton} onPress={() => {
                this.canvas.save('jpg', true, 'SketchCanvas', String(Math.ceil(Math.random() * 100000000)), true, true, true)
              }}>
                <Text style={{ color: 'white' }}>Save</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.header}> Draw Your Favorate Pattern</Text>
            <SketchCanvas
              text={[
                { text: 'COMS4156', font: 'Zapfino', fontSize: 15, position: { x: 0.25, y: 0.75 }, anchor: { x: 0.5, y: 0.5 }, coordinate: 'Ratio', overlay: 'TextOnSketch', fontColor: 'red', alignment: 'Center', lineHeightMultiple: 1 },
                { text: 'Co-Pics', fontSize: 25, position: { x: 1, y: 0.22 }, anchor: { x: 1, y: 0.5 }, coordinate: 'Ratio', overlay: 'TextOnSketch', fontColor: 'white', alignment: 'Right', lineHeightMultiple: 1 },
                { text: 'Real-time', fontSize: 25, position: { x: 1, y: 0.75 }, anchor: { x: 1, y: 0.5 }, coordinate: 'Ratio', overlay: 'TextOnSketch', fontColor: 'yellow', alignment: 'Right', lineHeightMultiple: 1 },
              ]}

              localSourceImage={{ filename: 'photo7.jpg', directory: SketchCanvas.MAIN_BUNDLE, mode: 'AspectFit' }}
              ref={ref => this.canvas = ref}
              style={{ flex: 1 }}

              strokeColor={this.state.color}
              strokeWidth={this.state.thickness}
              onStrokeEnd={data => {

              }}
              onStrokeStart={(x, y) => {
                // console.log('onStrokeStart:','x: ', x, ', y: ', y)
                this.setState({ message: 'Start' })
              }}
              onStrokeChanged={(x, y) => {
                // console.log('onStrokeChanged:','x: ', x, ', y: ', y)
                this.setState({ message: 'Changed' })
              }}
              onStrokeEnd={(path) => {
                // console.log('onStrokeEnd')
                this.setState({ message: 'End' })
                this.canvas.addPath(path)
                if (this.canvas.getPaths().length > this.state.pathcount) {
                  this.changepaths(this.canvas.getPaths())
                  this.state.pathcount = this.canvas.getPaths().length
                }
              }}
              onPathsChange={(pathsCount) => {
                // console.log('onPathsChange',this.canvas.getPaths())
                this.changepaths(this.canvas.getPaths())
              }}
            />
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.strokeColorButton, { backgroundColor: 'red' }]} onPress={() => {
                  this.setState({ color: '#FF0000' })
                }}>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.strokeColorButton, { backgroundColor: 'orange' }]} onPress={() => {
                  this.setState({ color: 'orange' })
                }}>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.strokeColorButton, { backgroundColor: 'yellow' }]} onPress={() => {
                  this.setState({ color: 'yellow' })
                }}>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.strokeColorButton, { backgroundColor: 'green' }]} onPress={() => {
                  this.setState({ color: 'green' })
                }}>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.strokeColorButton, { backgroundColor: '#0099ff' }]} onPress={() => {
                  this.setState({ color: '#0099ff' })
                }}>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.strokeColorButton, { backgroundColor: 'gray' }]} onPress={() => {
                  this.setState({ color: 'gray' })
                }}>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.strokeColorButton, { backgroundColor: 'black' }]} onPress={() => {
                  this.setState({ color: '#000000' })
                }}>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <TouchableOpacity style={styles.strokeWidthButton} onPress={() => {
                    this.setState({ thickness: 10 })
                  }}>
                    <Text style={{ color: 'white' }}>Thick</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.strokeWidthButton} onPress={() => {
                    this.setState({ thickness: 5 })
                  }}>
                    <Text style={{ color: 'white' }}>Thin</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextInput style={styles.textInput} defaultValue="Texts..." 
                  clearTextOnFocus ={true} 
                  onChangeText={(Text)=>{
                    this.state.newtext['text']=Text;
                    console.log(this.state.newtext)}
                  }>
                </TextInput>
                {/* <Picker style={styles.pickerInput} mode="dropdown">
                  <Picker.Item label="IndieFlower" value="fonts/IndieFlower.ttf" />
                  <Picker.Item label="Zapfino" value="Zapfino" />
                </Picker> */}
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.fontButton} onPress={() => {
                  this.state.newtext['font']='Zapfino'
                }}>
                   <Text style={[styles.fontSample, {fontFamily: "Zapfino"}, {fontSize: 10}]}> T </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fontButton} onPress={() => {
                  this.state.newtext['font']='IndieFlower'
                }}>
                  <Text style={[styles.fontSample, {fontFamily: "Didot-Bold"}]}> T </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fontButton} onPress={() => {
                  this.state.newtext['font']=null
                }}>
                  <Text style={[styles.fontSample, {fontFamily: "Cochin"}]}> T </Text>
                </TouchableOpacity>
              </View>
              
                <TouchableOpacity style={styles.textWidthButton} onPress={() => {
                  this.state.newtext['fontSize'] = this.state.thickness;
                  this.state.newtext['fontColor'] = this.state.color;
                  this.state.newtext['overlay'] = 'TextOnSketch';
                  this.state.newtext['anchor'] = { x: 0, y: 1 };
                  this.state.newtext['position'] = { x: 0, y: 1 };
                  this.state.newtext['alignment'] = 'Center';
                  this.state.newtext['coordinate'] = 'Ratio';
                  this.state.newtext['lineHeightMultiple'] = 1;
                  this.state.text += this.state.newtext;
                  console.log(this.state.text);
                  this.canvas.text = this.state.text;
                }}>
                  <Text style={{ color: 'white' }}>Add text</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  filterText: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#5ACFCF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  filterContainer: {
    width: width / 2,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5ACFCF'
  },
  textWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 90,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5ACFCF'
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#5ACFCF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textInput: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 120,
    borderColor: '#000000',
    borderWidth: 1
  },
  fontButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 40,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  fontSample: {
    color: 'white',
    fontSize: 20
  },
  pickerInput: {
    borderColor: '#000000',
    borderWidth: 1,
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 120,
  },
});
AppRegistry.registerComponent('EditScreen', () => EditScreen);