import React from 'react';
import {
	TouchableOpacity,
	Button,
	Text,
	Pressable
} from 'react-native';

// import {styles} from '../../css/login/Style';

function AddButton({onPress, title, description}): JSX.Element {
	return (
		<Pressable onPress = {onPress}>
			<Text >{title}</Text>
			<Text >{description}</Text>
		</Pressable>
	)
}

export default AddButton;