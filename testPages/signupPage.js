import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableHighlight,
} from 'react-native';

import {styles} from '../css/signup/Style';
// import InputForm from "../components/shared/InputForm";
import InputForm from "../testComps/shared/InputForm";
import ImageUpload from "../testComps/shared/ImageUpload";
// import signupConfig from "../routes/signup/signup";

import CheckBox from '@react-native-community/checkbox';
// import GestureRecognizer from 'react-native-swipe-gestures';
// import {GoogleSignin} from "@react-native-google-signin/google-signin";

// import {names} from "../components/SignUp/randomName.json";

function Signup({route, navigation, handleOnPress, handleSwitchAccount}) {

  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");

  const [validDisplayName, setValidDisplayName] = useState(true);
  const [validUserName, setValidUserName] = useState(true);

  const [picture, setPicture] = useState("");
  const [validPicture, setValidPicture] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(true);

  return (
    <View
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
          placeholder={'https://imgur.com/a/5IVD5Ew'}
        ></ImageUpload>


        <View style={styles.displayNameContainer}>
          <InputForm
            placeholder={'Enter Display Name'}
            value={displayName}
            setValue={setDisplayName}
            valid={validDisplayName}
            setValid={setValidDisplayName}
            editable={true}
            allowSpecial={true}
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
                    onPress = {handleOnPress}
                    testID="output">
					<Text style = {styles.signupText}>
						Sign Up
					</Text>
				</TouchableHighlight>
			</View>

      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>
          Signed in with: email
        </Text>
        <TouchableHighlight onPress={handleSwitchAccount}
          underlayColor = 'rgba(0,0,0,0.15)'
          style = {styles.switchText}
            testID="switch"
        >
          <Text style={styles.switchText}>
            Switch Accounts
          </Text>
        </TouchableHighlight>
      </View>
		</View>
  )
}


export default Signup;