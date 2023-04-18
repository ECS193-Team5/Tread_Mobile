import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  // CheckBox,
} from 'react-native';


import {styles} from '../css/signup/Style';

import CheckBox from '@react-native-community/checkbox';

function Signup(props): JSX.Element {
  const handleOnPress = function() {
    props.navigation.navigate("Challenge")
  }

  const checkValidName = function(name) {
		return name.length > 0
  }
  
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");

  const [validDisplayName, setValidDisplayName] = useState(false);
  const [validUserName, setValidUserName] = useState(false);

// 	console.log(props.route.params["email"])

	useEffect(() => {
		if(checkValidName(displayName)) {
			setValidDisplayName(true);
		} else {
			setValidDisplayName(false);
		}
	}, [displayName]);

	useEffect(() => {
		if(checkValidName(userName)) {
			setValidUserName(true);
		} else {
			setValidUserName(false);
		}
	}, [userName]);

  return (
		<View style = {styles.mainContainer}>
			<View style = {styles.titleContainer}>
				<Text style = {styles.title}>
					Sign Up
				</Text>
			</View>
			<View style = {styles.formContainer}>
				<TextInput
					placeholder = {props.route.params["email"]}
					style = {styles.input}
					editable = {false}
				/>
				<TextInput
					placeholder = "Display Name"
					style = {styles.input}
					onChangeText = {setDisplayName}
				/>
				<TextInput
					placeholder = "Username"
					style = {styles.input}
					onChangeText = {setUserName}
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
				<Pressable style = {styles.signupButton}
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