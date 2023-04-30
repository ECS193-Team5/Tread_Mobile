import React from 'react';
import {
	Pressable,
  Image,
  View
} from 'react-native';
import { Text } from 'react-native-elements';

import {cardStyles} from "../../css/cards/Style"
import { ImageStyles } from '../../css/imageCluster/Style';

function ImageCluster({images, isWeekly}): JSX.Element{
  const imageUrl1 = images[0]
  const imageUrl2 = images[1]
  const Num3 = images.length - 2
  const textNum3 = "+" + Num3

  if (Num3 > 0) {
    return (
      <View style = {cardStyles.ImageContainer}>
        <Image style ={ImageStyles.first} source={{uri: imageUrl1}}/>
        <Image style ={ImageStyles.second} source={{uri: imageUrl2}}/>
        <View style ={ImageStyles.third}>
          <Text style = {ImageStyles.thirdText}> {textNum3}</Text>
        </View>
      </View>
    )
  } else if (Num3 === 0){
      return(
        <View style = {cardStyles.ImageContainer}>
          <Image style ={ImageStyles.first} source={{uri: imageUrl1}}/>
          <Image style ={ImageStyles.second} source={{uri: imageUrl2}}/>
        </View>
      )
  } else {
    return(
      <View style = {cardStyles.ImageContainer}>
        <Image style ={isWeekly ? ImageStyles.weekly : ImageStyles.first} source={{uri: imageUrl1}}/>
      </View>
    )  }
}

export default ImageCluster;