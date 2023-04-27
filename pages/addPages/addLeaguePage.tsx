import React, { useState, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Pressable
} from 'react-native';

import {styles} from '../../css/add/league/Style';
import {launchImageLibrary} from 'react-native-image-picker';

function AddLeaguePage(props): JSX.Element {

	onChoosePicPress = function() {
		const options = {
			'includeBase64': true
		}

		launchImageLibrary(options, (response) => {
			console.log(response['assets'][0]['base64']);
		});
	}

  return (
		<View style = {styles.Background}>
			<View style = {styles.TitleContainer}>
				<Text style = {styles.Title}>
					Create League
				</Text>
			</View>

			<View style = {styles.InputContainer}>
				<View style = {styles.InputTitle}>
					<Text style = {styles.InputTitleText}>
						Picture
					</Text>
				</View>

				<View style = {styles.ChoosePicContainer}>
					<Pressable style = {styles.ChoosePicButton} onPress = {onChoosePicPress}>
					</Pressable>
				</View>

				<View style = {styles.InputTitle}>
					<Text style = {styles.InputTitleText}>
						Name
					</Text>
				</View>

				<View style = {styles.EnterLeagueContainer}>
				</View>

				<View style = {styles.InputTitle}>
					<Text style = {styles.InputTitleText}>
						Description
					</Text>
				</View>

				<View style = {styles.EnterDescContainer}>
				</View>

				<View style = {styles.InputTitle}>
					<Text style = {styles.InputTitleText}>
						Security
					</Text>
				</View>

				<View style = {styles.ChooseSecContainer}>
				</View>

				<View style = {styles.EnterButtonContainer}>
				</View>

			</View>

			<View style = {styles.SeparatorContainer}>
			</View>

		</View>
  )
}

export default AddLeaguePage;
