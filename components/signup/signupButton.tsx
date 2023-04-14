import React from 'react';
import {
	TouchableOpacity,
	Button
} from 'react-native';

function signUpOnPress(navigation) {
  navigation.navigate('Signup');
}

function SignUpButton(props): JSX.Element {
  return (
    <Button
    title = 'Sign Up'
    onPress = {() => signUpOnPress(props.navigation)}
  />
  )
}

export default SignUpButton;