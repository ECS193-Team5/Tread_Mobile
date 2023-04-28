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
import SwitchSelector from "react-native-switch-selector";

import {BACKEND_URL} from '@env';
import axios from 'axios';

function AddLeaguePage(props): JSX.Element {

	const [picture, setPicture] = useState({});
	const [validPicture, setValidPicture] = useState(false);

	const [leagueName, setLeagueName] = useState("");
	const [validLeagueName, setValidLeagueName] = useState(false);

	const [leagueDesc, setLeagueDesc] = useState("");
	const [validLeagueDesc, setValidLeagueDesc] = useState(false);

	const [security, setSecurity] = useState("private");

	const switchOptions = [
		{label: 'Private', value: 'private'},
		{label: 'Public', value: 'public'}
	];

	const onChoosePicPress = function() {
		const options = {
			'includeBase64': true,
			'maxWidth': 400,
			'maxHeight': 400
		}

		launchImageLibrary(options, (response) => {
			const source = response['assets'][0]["base64"];
			setPicture("data:image/jpeg;base64," + source)
			setValidPicture(true);
		});
	}

	const onLeagueNameChange = function(name) {
		setLeagueName(name);
		if(checkValidLeagueName(name)) {
			setValidLeagueName(true);
		} else {
			setValidLeagueName(false);
		}
	}

	const onLeagueDescChange = function(desc) {
		setLeagueDesc(desc);
		if(checkValidLeagueDesc(desc)) {
			setValidLeagueDesc(true);
		} else {
			setValidLeagueDesc(false);
		}
	}

	const checkValidLeagueName = function(name) {
		return name.length > 0
	}

	const checkValidLeagueDesc = function(desc) {
		return desc.length > 0
	}

	const onSubmit = function() {
		var config = {
			method: 'post',
			url: BACKEND_URL + 'league/create_league',
			withCredentials: true,
			credentials: 'include',
			headers: {
				Accept: 'application/json',
			data: {
				'leagueName': leagueName,
				'leagueDescription': leagueDesc,
				'leagueType': security,
				'leaguePicture': picture
			}
		};

		axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
			setPicture("");
			setLeagueName("");
			setLeagueDesc("");
		})
		.catch(function (error) {
			console.log(error);
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
						<Text style = {styles.ChoosePicText}>
							Choose Picture
						</Text>
					</Pressable>
				</View>

				<View style = {styles.InputTitle}>
					<Text style = {styles.InputTitleText}>
						Name
					</Text>
				</View>

				<View style = {styles.EnterLeagueContainer}>
					<TextInput
						placeholder = "Enter league name"
						placeholderTextColor= "grey"
						style = {styles.NameInput}
						onChangeText = {onLeagueNameChange}
						value = {leagueName}
					>
					</TextInput>
				</View>

				<View style = {styles.InputTitle}>
					<Text style = {styles.InputTitleText}>
						Description
					</Text>
				</View>

				<View style = {styles.EnterDescContainer}>
					<TextInput
						placeholder = "Enter league description"
						placeholderTextColor= "grey"
						style = {styles.DescInput}
						onChangeText = {onLeagueDescChange}
						value = {leagueDesc}
						multiline = {true}
					>
					</TextInput>
				</View>

				<View style = {styles.InputTitle}>
					<Text style = {styles.InputTitleText}>
						Security
					</Text>
				</View>

				<View style = {styles.ChooseSecContainer}>
					<SwitchSelector
						options = {switchOptions}
						initial = {0}
						selectedColor = 'white'
						textColor = '#014421'
						buttonColor = '#014421'
						borderColor = '#014421'
						onPress = {setSecurity}
						hasPadding = {true}
					>
					</SwitchSelector>
				</View>

				<View style = {styles.EnterButtonContainer}>
					<Pressable
						style = {(validPicture && validLeagueName && validLeagueDesc) ? styles.EnterButtonValid : styles.EnterButtonInvalid}
						onPress = {onSubmit}
						disabled = {!(validPicture && validLeagueName && validLeagueDesc)}
						>
						<Text style = {styles.ChoosePicText}>
							Submit
						</Text>
					</Pressable>
				</View>

			</View>

			<View style = {styles.SeparatorContainer}>
			</View>

		</View>
  )
}

export default AddLeaguePage;
