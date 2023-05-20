import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableHighlight} from "react-native";
import {ImageUploadStyles} from "../../css/shared/ImageUploadStyle";
import {launchImageLibrary} from 'react-native-image-picker';

function ImageUpload(props): JSX.Element {
  const [image, setImage] = useState(<Image/>);

  useEffect(() => {
    setImage(
      <Image
        style={ImageUploadStyles.ImagePreview}
        source={{uri: (Object.keys(props.picture).length === 0) ? props.placeholder : props.picture}}
      >
      </Image>
    )
  },[])


  const onChoosePicPress = function() {
    const options = {
      'includeBase64': true,
      'maxWidth': 200,
      'maxHeight': 200
    }

    launchImageLibrary(options, (response) => {
      if(!response['didCancel']) {
        const source = response['assets'][0]["base64"];
        setImage(
          <Image
            style={ImageUploadStyles.ImagePreview}
            source={{uri: ("data:image/jpeg;base64," + source)}}
          >
          </Image>
        )
        props.setPicture("data:image/jpeg;base64," + source)
        props.setValidPicture(true);
      }
    });
  }

  return (
    <View style={[ImageUploadStyles.MainContainer, {flex: props.flex}]}>
      <View style={ImageUploadStyles.ImagePreviewContainer}>
        {image}
      </View>
      <View style={ImageUploadStyles.ChoosePicContainer}>
        <TouchableHighlight
          style={ImageUploadStyles.ChoosePicButton}
          onPress={onChoosePicPress}
          underlayColor = '#013319'
        >
          <Text
            style = {ImageUploadStyles.ChoosePicText}
          >
            Choose Picture
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default ImageUpload;