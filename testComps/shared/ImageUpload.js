import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableHighlight} from "react-native";
import {ImageUploadStyles} from "../../css/shared/ImageUploadStyle";

function ImageUpload(props) {
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



  return (
    <View style={[ImageUploadStyles.MainContainer, {flex: props.flex}]}>
      <View style={ImageUploadStyles.ImagePreviewContainer}>
        {image}
      </View>
      <View style={ImageUploadStyles.ChoosePicContainer}>
        <TouchableHighlight
          style={ImageUploadStyles.ChoosePicButton}
          onPress={props.onChoosePicPress}
          underlayColor = '#013319'
          testID='input'
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