import React from 'react';
import {
	TouchableOpacity,
	Button,
	Text,
	Pressable
} from 'react-native';

import {styles} from '../../css/add/home/Style';

function AddButton({onPress, title, description}): JSX.Element {
	return (
		<Pressable onPress = {onPress} style = {styles.Button}>
			<Text >{title}</Text>
			<Text >{description}</Text>
		</Pressable>
	)
}

export default AddButton;