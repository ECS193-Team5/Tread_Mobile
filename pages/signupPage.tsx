import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable, Image,
} from 'react-native';

import {BACKEND_URL} from '@env';
import axios from 'axios';

import {styles} from '../css/signup/Style';
import InputForm from "../components/shared/InputForm";
import ImageUpload from "../components/shared/ImageUpload";
import signupConfig from "../routes/signup/signup";

import CheckBox from '@react-native-community/checkbox';

function Signup({route, navigation}): JSX.Element {

  const handleOnPress = async function() {
    axios(signupConfig(userName, displayName, picture))
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      navigation.navigate("Challenge");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const checkValidName = function(name) {
		console.log(name)
    return name.length > 0
  }

  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");

  const [validDisplayName, setValidDisplayName] = useState(false);
  const [validUserName, setValidUserName] = useState(false);

  const [picture, setPicture] = useState(route.params.photo);
  const [validPicture, setValidPicture] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
		<View style = {styles.mainContainer}>
			<View style = {styles.titleContainer}>
				<Text style = {styles.title}>
					Sign Up
				</Text>
			</View>
			<View style = {styles.formContainer}>

        <ImageUpload
          flex = {50}
          // placeholder = {route.params.photo}
          picture={picture}
          setPicture={setPicture}
          valid={validPicture}
          setValidPicture={setValidPicture}

        ></ImageUpload>


        <View style={styles.displayNameContainer}>
          <InputForm
            placeholder={'Enter Display Name'}
            value={displayName}
            setValue={setDisplayName}
            valid={validDisplayName}
            setValid={setValidDisplayName}
            editable={true}
          />
        </View>
        <View style={styles.userNameContainer}>
          <InputForm
            placeholder={'Enter Username'}
            value={userName}
            setValue={setUserName}
            valid={validUserName}
            setValid={setValidUserName}
            editable={true}
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            boxType = {'circle'}
            onFillColor = '#014421'
            onCheckColor= '#ffffff'
            animationDuration={0.3}
            lineWidth = {2}
          />
          <Text style={styles.checkboxinput}>
            By signing up you accept the
            <Text style = {{color:"#014421"}}> Terms of service </Text>
            and
            <Text style = {{color:"#014421"}}> Privacy Policy</Text>
          </Text>
        </View>


			</View>
			<View style = {styles.signupContainer}>
				<Pressable style = {validUserName && validDisplayName && toggleCheckBox? styles.validSignupButton : styles.invalidSignupButton}
					disabled = {!(validUserName && validDisplayName && toggleCheckBox)}
          onPress = {handleOnPress}>
					<Text style = {styles.signupText}>
						Sign Up
					</Text>
				</Pressable>
			</View>
		</View>
  )
}


export default Signup;