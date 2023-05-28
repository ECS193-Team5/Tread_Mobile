import React from 'react';
import {
	Text,
	View,
	Image,
  TouchableHighlight
} from 'react-native';

import {styles} from '../../css/add/home/Style';

function AddButton({onPress, title, description, imageUrl}) {
	return (
			<TouchableHighlight onPress = {onPress} style = {styles.Button} testID="button">
				<View style={styles.GradientStyle}>
					<View style = {styles.IconContainer}>
						<Image
							src = {imageUrl}
							style = {styles.Image}
						>
						</Image>
					</View>

					<View style = {styles.TextContainer}>
						<View style = {styles.TitleContainer}>
							<Text style = {styles.Title}>{title}</Text>
						</View>

						<View style = {styles.DescContainer}>
							<Text style = {styles.Description}>{description}</Text>
						</View>

					</View>

				</View>

			</TouchableHighlight>
	)
}

export default AddButton;