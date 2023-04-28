import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import {styles} from "../css/login/Style"
import {
	GoogleSignin,
} from '@react-native-google-signin/google-signin';

function ProfilePage(props): JSX.Element {
	signOut = async () => {
		try {
			await GoogleSignin.signOut();
		} catch (error) {
			console.error(error);
		}
	};

  return (
    <View style = {styles.container}>
      <Button 
        title = "profile page"
        onPress = {() =>
					signOut().then(response => {
  	        props.navigation.navigate('Login')
					})
        }
      />
    </View>
  )
}

export default ProfilePage;
