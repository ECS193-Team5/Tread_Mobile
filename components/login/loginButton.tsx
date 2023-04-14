import React from 'react';
import {
	TouchableOpacity,
	Button,
	Text,
	Pressable
} from 'react-native';

import {styles} from '../../css/login/Style';

function LoginButton({onPress}): JSX.Element {
	return (
		<Pressable 
			onPress = {onPress}
			style = {styles.appButtonContainer}
		>
			<Text style={styles.appButtonText}>Log In</Text>
		</Pressable>
	)
}

export default LoginButton;
