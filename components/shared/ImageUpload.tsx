import React, {useEffect, useState} from 'react';
import {TextInput, View, Pressable, Text, Image} from "react-native";
import {ImageUploadStyles} from "../../css/shared/ImageUploadStyle";

function ImageUpload(props): JSX.Element {
  useEffect(() => {
    console.log(props.placeholder)
  },[])

  return (
    <View style={[ImageUploadStyles.MainContainer, {flex: props.flex}]}>
      <View style={ImageUploadStyles.ImagePreviewContainer}>
        <Image
          style={ImageUploadStyles.ImagePreview}
          src={props.placeholder}
        >

        </Image>
      </View>
      <View style={ImageUploadStyles.ChoosePicContainer}>
        <Pressable style={ImageUploadStyles.ChoosePicButton}>
          <Text style = {ImageUploadStyles.ChoosePicText}>
            Choose Picture
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ImageUpload;