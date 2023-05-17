import React, {useEffect, useState} from 'react';
import {TextInput, View, Pressable, Text, Image} from "react-native";
import {ImageUploadStyles} from "../../css/shared/ImageUploadStyle";
import {launchImageLibrary} from 'react-native-image-picker';

function ImageUpload(props): JSX.Element {
  const [image, setImage] = useState(<Image/>);

  useEffect(() => {
    // console.log(props.picture)
    // console.log(Object.keys(props.picture).length !== 0)
    if(Object.keys(props.picture).length !== 0) {
      setImage(
        <Image
          style={ImageUploadStyles.ImagePreview}
          source={{uri: props.picture}}
        >
        </Image>
      )

    } else {
      // console.log("Use placeholder")
      setImage(
        <Image
          style={ImageUploadStyles.ImagePreview}
          src={props.placeholder}
        >
        </Image>
      )
    }
  },[])


  const onChoosePicPress = function() {
    const options = {
      'includeBase64': true,
      'maxWidth': 200,
      'maxHeight': 200
    }

    launchImageLibrary(options, (response) => {
      if(!response['didCancel']) {
        // console.log('Picture Chosen');
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
        <Pressable
          style={ImageUploadStyles.ChoosePicButton}
          onPress={onChoosePicPress}
        >
          <Text
            style = {ImageUploadStyles.ChoosePicText}
          >
            Choose Picture
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ImageUpload;