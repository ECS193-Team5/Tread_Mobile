import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  // CheckBox,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '@env';
import axios from 'axios';

import {styles} from '../css/signup/Style';

import CheckBox from '@react-native-community/checkbox';

function Signup(props): JSX.Element {

  const getGoogleToken = async () => {
//     console.log('Getting token')
    try {
      const item = await AsyncStorage.getItem('token');
//       console.log(item)
// 			console.log('Got token')
      return String(item)
    } catch (err) {
      console.log(err);
    }
  }

  const getPhoto = async () => {
//     console.log('Getting token')
    try {
      const item = await AsyncStorage.getItem('photo');
//       console.log(item)
// 			console.log('Got token')
      return String(item)
    } catch (err) {
      console.log(err);
    }
  }

  const getFCMToken = async () => {
//     console.log('Getting FCM token')
    try {
      const item = await AsyncStorage.getItem('fcmToken');
//       console.log(item)
// 			console.log('Got FCM token')
// 			console.log(item)
      return String(item)
    } catch (err) {
      console.log(err);
    }

  }


  
  const handleOnPress = async function() {
		const authToken = await getGoogleToken();
		const deviceToken = await getFCMToken();
		const picture = await getPhoto();

    var config = {
      method: 'post',
      url: BACKEND_URL + 'sign_up/sign_up',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': authToken,
        Accept: 'application/json',
      },
      data: {
        'deviceToken': deviceToken,
        'username' : userName,
        'displayName' : displayName,
        'picture' : picture
      }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      props.navigation.navigate("Challenge");
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
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");

  const [validDisplayName, setValidDisplayName] = useState(true);
  const [validUserName, setValidUserName] = useState(true);

  const [displayNameStyle, setDisplayStyle] = useState(styles.invalidInput);
  const [userNameStyle, setUserStyle] = useState(styles.invalidInput);
	
  useEffect(() => {
		getEmail();
	}, []);

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

	const getEmail = async () => {
		try {
			const item = await AsyncStorage.getItem('email');
			console.log(item)
      setEmail(item);
		} catch (err) {
			console.log(err);
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
				<TextInput
					placeholder = {email}
					style = {styles.validInput}
                    placeholderTextColor = "#014421"
					editable = {false}
				/>
				<TextInput
					placeholder = "Display Name"
                    placeholderTextColor= "grey"
					style = {validDisplayName ? styles.validInput : styles.invalidInput}
					onChangeText = {handleDisplayNameChange}
				/>
				<TextInput
					placeholder = "Username"
                    placeholderTextColor= "grey"
					style = {validUserName ? styles.validInput : styles.invalidInput}
					onChangeText = {handleUserNameChange}
				/>
			</View>
			<View style = {styles.checkContainer}>
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
			<View style = {styles.signupContainer}>
				<Pressable style = {validUserName && validDisplayName && toggleCheckBox ? styles.validSignupButton : styles.invalidSignupButton}
					disabled = {!(validUserName && validDisplayName && toggleCheckBox)}
          onPress = {handleOnPress}>
					<Text style = {styles.signupText}>
						Sign Up
					</Text>
				</Pressable>
			</View>
			<View style = {styles.signinContainer}>
      <Text style={styles.checkboxinput}>
        Already have an account ?
        <Text style = {{color:"#014421"}}> Sign in </Text>
      </Text>
      </View>
		</View>
  )
}


export default Signup;