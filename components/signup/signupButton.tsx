import React from 'react';
import {
	TouchableOpacity,
	Button,
	Text,
	Pressable
} from 'react-native';

import {styles} from '../../css/login/Style';

function SignUpButton({onPress}): JSX.Element {
	return (
		<Pressable 
			onPress = {onPress}
			style = {styles.signupButton}
		>
			<Text style={styles.signupButtonText}>Sign Up</Text>
		</Pressable>
	)
}

export default SignUpButton;