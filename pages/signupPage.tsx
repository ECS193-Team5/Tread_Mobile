import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

import {BACKEND_URL} from '@env';
import axios from 'axios';

import {styles} from '../css/signup/Style';
import InputForm from "../components/shared/InputForm";

import CheckBox from '@react-native-community/checkbox';

function Signup({route, navigation}): JSX.Element {

  const handleOnPress = async function() {
		const picture = route.params.photo;

    var config = {
      method: 'post',
      url: BACKEND_URL + 'sign_up/sign_up',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data: {
        'username' : userName,
        'displayName' : displayName,
        'picture' : picture
      }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      navigation.navigate("Challenge");
    })
    .catch(function (error) {
      console.log(error);
    });
//   	checkToken();
//     props.navigation.navigate("Challenge")
  }

  const checkValidName = function(name) {
		console.log(name)
    return name.length > 0
  }

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");

  const [validDisplayName, setValidDisplayName] = useState(false);
  const [validUserName, setValidUserName] = useState(true);

  const [displayNameStyle, setDisplayStyle] = useState(styles.invalidInput);
  const [userNameStyle, setUserStyle] = useState(styles.invalidInput);

  const handleDisplayNameChange = function(item) {
    setDisplayName(item)
		if(checkValidName(item)) {
			setValidDisplayName(true);
		} else {
			setValidDisplayName(false);
		}
  }

  const handleUserNameChange = function(item) {
    setUserName(item)
		if(checkValidName(item)) {
			setValidUserName(true);
		} else {
			setValidUserName(false);
		}
  }

  return (
		<View style = {styles.mainContainer}>
			<View style = {styles.titleContainer}>
				<Text style = {styles.title}>
					Sign Up
				</Text>
			</View>
			<View style = {styles.formContainer}>
        <View style={styles.choosePicContainer}>
        </View>
        <View style={styles.displayNameContainer}>
          <InputForm
            placeholder={'Enter Display Name'}
            value={displayName}
            setValue={setDisplayName}
            valid={validDisplayName}
            setValid={setValidDisplayName}
            editable={true}
          >

          </InputForm>

        </View>
        <View style={styles.userNameContainer}>

        </View>

			</View>
			{/*<View style = {styles.checkContainer}>*/}
      {/*<CheckBox*/}
      {/*  disabled={false}*/}
      {/*  value={toggleCheckBox}*/}
      {/*  onValueChange={(newValue) => setToggleCheckBox(newValue)}*/}
      {/*  boxType = {'circle'}*/}
      {/*  onFillColor = '#014421'*/}
      {/*  onCheckColor= '#ffffff'*/}
      {/*  animationDuration={0.3}  */}
      {/*  lineWidth = {2}*/}
      {/*/>*/}
      {/*<Text style={styles.checkboxinput}>*/}
      {/*  By signing up you accept the*/}
      {/*  <Text style = {{color:"#014421"}}> Terms of service </Text>*/}
      {/*  and*/}
      {/*  <Text style = {{color:"#014421"}}> Privacy Policy</Text>*/}
      {/*</Text>*/}
      {/*</View>*/}
			<View style = {styles.signupContainer}>
				<Pressable style = {validUserName && validDisplayName && toggleCheckBox ? styles.validSignupButton : styles.invalidSignupButton}
					disabled = {!(validUserName && validDisplayName && toggleCheckBox)}
          onPress = {handleOnPress}>
					<Text style = {styles.signupText}>
						Sign Up
					</Text>
				</Pressable>
			</View>
			{/*<View style = {styles.signinContainer}>*/}
      {/*<Text style={styles.checkboxinput}>*/}
      {/*  Already have an account ?*/}
      {/*  <Text style = {{color:"#014421"}}> Sign in </Text>*/}
      {/*</Text>*/}
      {/*</View>*/}
		</View>
  )
}


export default Signup;