import React from 'react';
import {View,Text,Image,StyleSheet,Dimensions} from "react-native";

import {
    Grayscale,
    Sepia,
    Tint,
    ColorMatrix,
    concatColorMatrices,
    invert,
    contrast,
    saturate,
    Night,
    Cool,
    ColorTone,
    Temperature,
    Brightness
  } from 'react-native-color-matrix-image-filters'; 
const { width, height } = Dimensions.get('window');
function ShowPic({ image, selectedFilter }) {
    if(selectedFilter == 1){
        return (
            <Grayscale>
                <Image source={image} style={styles.stretch}/>
            </Grayscale>
        );
    } else if(selectedFilter == 2){
        return (
            <ColorMatrix matrix={concatColorMatrices([saturate(-8.2), contrast(0.9), invert()])}>
                <Image source={image} style={styles.stretch}/>
            </ColorMatrix>
        )
    } else if(selectedFilter == 3){
        return (
            <Tint amount={0.9}>
                <Image source={image} style={styles.stretch}/>
            </Tint>
        )
    } else if(selectedFilter == 4){
        return (
            <Brightness amount={1.2}>
                <Cool>
                    <Image source={image} style={styles.stretch}/>
                </Cool>
            </Brightness>
        )
    } else if(selectedFilter == 5){
        return (
            <Temperature amount={0.3}>
                    <Image source={image} style={styles.stretch}/>
            </Temperature>
        )
    } else if(selectedFilter == 6){
        return (
            <Cool>
                    <Image source={image} style={styles.stretch}/>
            </Cool>
        )
    } else if(selectedFilter == 0){
            return (
                <Image source={image} style={styles.stretch}/>
            )
        }
}

const styles = StyleSheet.create({
    topic: {
        width: 1000,
        alignItems:'center',
        backgroundColor: 'white',
        paddingBottom:10,
        marginBottom:10,
    },
    topicHead:{
        fontSize:16,
        color:'#666',
        padding:15,
    },
    stretch: {
        width: width,
        height: 220,
        resizeMode: 'contain',
        backgroundColor: "white",
      },
})


export default ShowPic;