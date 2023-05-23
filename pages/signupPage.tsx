import React, { useState} from 'react';
import {
  View,
  Text,
  Keyboard, 
  TouchableHighlight,
} from 'react-native';

import {BACKEND_URL} from '@env';
import axios from 'axios';

import {styles} from '../css/signup/Style';
import InputForm from "../components/shared/InputForm";
import ImageUpload from "../components/shared/ImageUpload";
import signupConfig from "../routes/signup/signup";

import CheckBox from '@react-native-community/checkbox';
import GestureRecognizer from 'react-native-swipe-gestures';
import {GoogleSignin} from "@react-native-google-signin/google-signin";

function Signup({route, navigation}): JSX.Element {

  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");

  const [validDisplayName, setValidDisplayName] = useState(false);
  const [validUserName, setValidUserName] = useState(false);

  const [picture, setPicture] = useState(route.params.photo);
  const [validPicture, setValidPicture] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleOnPress = async function() {
    axios(signupConfig(userName, displayName, picture, route.params.deviceToken))
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      navigation.navigate("Challenge");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwitchAccount = async function() {
    signOut().then(response => {
      navigation.navigate('Login')
    })
  }


  return (
    <GestureRecognizer
      onSwipeDown = {() => Keyboard.dismiss()}
      style={styles.mainContainer}      
    >
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
            allowSpecial={null}
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
            allowSpecial={null}
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
				<TouchableHighlight style = {validUserName && validDisplayName && toggleCheckBox? styles.validSignupButton : styles.invalidSignupButton}
					disabled = {!(validUserName && validDisplayName && toggleCheckBox)}
          underlayColor = '#013319'
          onPress = {handleOnPress}>
					<Text style = {styles.signupText}>
						Sign Up
					</Text>
				</TouchableHighlight>
			</View>

      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>
          Signed in with: {route.params.email}
        </Text>
        <TouchableHighlight onPress={handleSwitchAccount}
          underlayColor = 'rgba(0,0,0,0.15)'
          style = {styles.switchText}
        >
          <Text style={styles.switchText}>
            Switch Accounts
          </Text>
        </TouchableHighlight>
      </View>
		</GestureRecognizer>
  )
}


export default Signup;