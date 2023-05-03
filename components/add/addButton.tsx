import React from 'react';
import {
	TouchableOpacity,
	Button,
	Text,
	Pressable,
	View,
	Image
} from 'react-native';

import {styles} from '../../css/add/home/Style';
import LinearGradient from 'react-native-linear-gradient';

function AddButton({onPress, title, description, imageUrl}): JSX.Element {
	return (
			<Pressable onPress = {onPress} style = {styles.Button}>
				<LinearGradient
          colors={['rgba(1, 63, 33,1)', 'rgba(1, 63, 33,0.5)', 'rgb(1, 100, 0)']}
          style={styles.GradientStyle}
					>
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

				</LinearGradient>
			</Pressable>
	)
}

export default AddButton;