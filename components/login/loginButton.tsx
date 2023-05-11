import React from 'react';
import {
	Text,
	Pressable
} from 'react-native';

import {styles} from '../../css/login/Style';

function LoginButton({onPress}): JSX.Element {
	return (
		<Pressable 
			onPress = {onPress}
			style = {styles.loginButton}
		>
			<Text style={styles.loginButtonText}>Log In</Text>
		</Pressable>
	)
}

export default LoginButton;
