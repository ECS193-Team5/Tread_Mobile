import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import {ANDROID_CLIENT, WEB_CLIENT} from '@env'
 
function Login(props): JSX.Element {
  return (
    <View>
      <Button
        title = "login"
        onPress = {() => {
					GoogleSignin.configure({
							offlineAccess: true,
							androidClientId: ANDROID_CLIENT,
							webClientId: WEB_CLIENT
	//             iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
					});

					GoogleSignin.hasPlayServices().then((hasPlayService) => {
									if (hasPlayService) {
											 GoogleSignin.signIn().then((userInfo) => {
																 console.log(JSON.stringify(userInfo))
											 }).catch((e) => {
											 console.log("ERROR IS: " + JSON.stringify(e));
											 })
									}
					}).catch((e) => {
							console.log("ERROR IS: " + JSON.stringify(e));
							props.navigation.navigate('Challenge')
					})
        }

				}
      />      
      <Button
        title = "signup"
        onPress = {() =>
          props.navigation.navigate('Signup')
        }
      />

    </View>
  )
}

export default Login;
