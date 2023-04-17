import React from 'react';
import {
	TouchableOpacity,
	Button,
	Text,
	Pressable
} from 'react-native';

import {styles} from '../../css/login/Style';

function swapCard({onPress}): JSX.Element {
	return (
		<Pressable 
			onPress = {onPress}
			style = {styles.LoginButtonContainer}
		>
			<Text style={styles.LoginButtonText}>Log In</Text>
		</Pressable>
	)
}

export default swapCard;