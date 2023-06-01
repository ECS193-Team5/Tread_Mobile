import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableHighlight, PermissionsAndroid, Platform} from "react-native";
import {ImageUploadStyles} from "../../css/shared/ImageUploadStyle";
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';

function ImageUpload(props): JSX.Element {
  const [image, setImage] = useState(<Image/>);
  const [imagePermission, setImagePermission] = useState(false);

  useEffect(() => {
    setImage(
      <Image
        style={ImageUploadStyles.ImagePreview}
        source={{uri: (Object.keys(props.picture).length === 0) ? props.placeholder : props.picture}}
      >
      </Image>
    )
  },[])

  useEffect(() => {
    if(imagePermission){
      ImagePicker.openPicker({
        width: 200,
        height: 200,
        cropping: true,
        includeBase64: true
      }).then(image => {
        let base64Image = "data:image/jpeg;base64,"+image.data;
        
        setImage(
          <Image style={ImageUploadStyles.ImagePreview} source={{uri: base64Image}} />
        )
        props.setPicture(base64Image)
        props.setValidPicture(true);
      });

      setImagePermission(false);
    }
  },[imagePermission])

  async function requestAndroidImageLibraryPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setImagePermission(true);
      } else {
        console.log(granted);
        alert('Image permission denied. Please check your settings to allow image permissions again.');
        setImagePermission(false);
      }
    } catch (err) {
      alert('Image Permission Err');
      setImagePermission(false);
    }
  }

  async function requestAppleImageLibraryPermission() {
    const libraryPermission = PERMISSIONS.IOS.PHOTO_LIBRARY
    try {
      const permissionStatus = await check(libraryPermission);

      if (permissionStatus === RESULTS.GRANTED || permissionStatus === RESULTS.LIMITED) {
        setImagePermission(true);
        return;
      } else if (permissionStatus === RESULTS.UNAVAILABLE
        || permissionStatus === RESULTS.BLOCKED) {
          alert('Image permission denied');
          setImagePermission(false);
          return;
      } 
     
      const requestedPermissionResult = await request(libraryPermission);

      if (requestedPermissionResult === RESULTS.GRANTED || requestedPermissionResult === RESULTS.LIMITED) {
        setImagePermission(true);
        return;
      }  else {
        alert('Image permission denied');
        setImagePermission(false);
        return;
      }

    } catch {
      alert('Image Permission Err');
      setImagePermission(false);
    }
  }

  const onChoosePicPress = async function() {
    if(Platform.OS === "android"){
      await requestAndroidImageLibraryPermission()
    }
    else{
      await requestAppleImageLibraryPermission()
    }
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