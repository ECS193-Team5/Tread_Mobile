import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import {ProfileStyles} from "../css/profile/Style";
import {
	GoogleSignin,
} from '@react-native-google-signin/google-signin';

function ProfilePage(props): JSX.Element {
	// signOut = async () => {
	// 	try {
	// 		await GoogleSignin.signOut();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

  return (
	  <View style={ProfileStyles.Background}>

	  </View>
  )
}

export default ProfilePage;
