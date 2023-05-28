import React, {useEffect, useState} from 'react';
import {
  View,
  Text, Image, ActivityIndicator, Platform
} from 'react-native';

import LoginButton from "../testComps/login/loginButton";
import {LoginStyles} from '../css/login/Style';

import Logo from '../assets/logorenderflipped.png'

import CheckBox from '@react-native-community/checkbox';
function Login({route, navigation}) {

  const [isSignedInGoogle, setIsSignedInGoogle] = useState(true)
  const [isSignedInApple, setIsSignedInApple] = useState(true)

  const [animate, setAnimate] = useState(true)
  const [CheckOn, setCheckOn] = useState(false)

  const default_image = Image.resolveAssetSource(Logo).uri

  return (
    <View >
      {isSignedInGoogle || isSignedInApple?
        <View
          style = {LoginStyles.linearGradientAuto}
        >
          <Image
            src={default_image}
            style={LoginStyles.logo}
          />
          {animate ?
            <ActivityIndicator size = 'large' color = "#F9A800" animating = {animate}/>
            :
            <CheckBox
              disabled={false}
              value={CheckOn}
              boxType = {'circle'}
              onFillColor = '#F9A800'
              onCheckColor= '#ffffff'
              animationDuration={0.5}
              lineWidth = {2}
              style = {{alignSelf : 'center'}}
            />
          }

        </View>

      :
      <View
        style = {LoginStyles.linearGradient}
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
            >
            </LoginButton>
          </View>
        </View>

      </View>
      }
    </View>
  )
}

export default Login;