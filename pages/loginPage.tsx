import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import LoginButton from '../components/login/loginButton';
import SignUpButton from '../components/signup/signupButton';


import {styles} from '../css/login/Style'

function Login(props): JSX.Element {
  return (
      <View>
        <LinearGradient
          colors = {['#014421', '#000000']}
          style = {styles.linearGradient}
          start = {{x:1, y: 0}}
        >
          <LoginButton>
            navigation = {props.navigation}
          </LoginButton>
          <SignUpButton>
            navigation = {props.navigation}
          </SignUpButton>
        </LinearGradient>
      </View>
  )
}

export default Login;
