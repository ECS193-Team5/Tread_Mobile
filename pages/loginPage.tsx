import React, {useEffect} from 'react';
import {
  View,
  Text, Image
} from 'react-native';

import "../components/Sensors/healthKit";
import LinearGradient from 'react-native-linear-gradient';
import LoginButton from '../components/login/loginButton';
import {LoginStyles} from '../css/login/Style';

function Login({route, navigation}): JSX.Element {

  useEffect(() => {
    // Get the deep link used to open the app
    console.log("This use effect is triggered in login.tsx");
  });

  return (
    <View >
      <LinearGradient
        colors = {['#014421', '#000000']}
        style = {LoginStyles.linearGradient}
        start = {{x:1, y: 0}}
      >
        <Image
          src={'https://i.imgur.com/FTHVwBA.png'}
          style={LoginStyles.pushupImage}
        />

        <Image
          src={'https://i.imgur.com/7z2WZm7.png'}
          style={LoginStyles.liftingImage}
        />

        <Image
          src={'https://i.imgur.com/JqkFVQC.png'}
          style={LoginStyles.skiImage}
        />
        <View style = {LoginStyles.mainContainer}>
          <View style = {LoginStyles.titleContainer}>
            <Text style = {LoginStyles.titleText}>
              Tread
            </Text>
          </View>
          <View style = {LoginStyles.loginContainer}>
            <LoginButton
              filled={true}
              text={'Log In'}
              navigation={navigation}
            >
            </LoginButton>
          </View>
          <View style = {LoginStyles.separatorContainer}>
              <View style = {LoginStyles.outsideSeparator}>
              </View>
              <View style = {LoginStyles.middleSeparator}>
                <Text style = {LoginStyles.orText}>
                    or
                </Text>
              </View>
              <View style = {LoginStyles.outsideSeparator}>
              </View>
          </View>
          <View style = {LoginStyles.signUpContainer}>
            <LoginButton
              filled={false}
              text={'Sign Up'}
              navigation={navigation}
            >
            </LoginButton>
          </View>
        </View>

      </LinearGradient>
    </View>
  )
}

export default Login;