import React from 'react';
import {View,Text,Image,StyleSheet} from "react-native";

import {
    Grayscale,
    Sepia,
    Tint,
    ColorMatrix,
    concatColorMatrices,
    invert,
    contrast,
    saturate
  } from 'react-native-color-matrix-image-filters'; 

function ShowPic({ image, selectedFilter }) {
    if(selectedFilter == 1){
        return (
            <Grayscale>
                <Image source={image} style={styles.stretch}/>
            </Grayscale>
        );
    } else if(selectedFilter == 2){
        return (
            <Tint amount={1.25}>
                <Sepia>
                    <Image source={image} style={styles.stretch}/>
                </Sepia>
            </Tint>
        )
    } else if(selectedFilter == 3){
        return (
            <ColorMatrix
                matrix={concatColorMatrices([saturate(-0.9), contrast(5.2), invert()])}
                // alt: matrix={[saturate(-0.9), contrast(5.2), invert()]}
            >
                <Image source={image} style={styles.stretch}/>
            </ColorMatrix>
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
        width: 420,
        height: 200,
        resizeMode: 'stretch',
        backgroundColor: "white",
      },
})


export default ShowPic;