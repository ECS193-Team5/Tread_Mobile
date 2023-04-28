import React, { useState, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Pressable
} from 'react-native';

import {styles} from '../../css/add/friend/Style';
import {BACKEND_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function AddFriendPage(props): JSX.Element {

	const [friendID, setFriendID] = useState("");
	const [validID, setValidID] = useState(false);
	const [placeholder, setPlaceholder] = useState("Enter friend ID");

	const onFriendChange = function(id) {
		console.log(id);
		setFriendID(id);
		if(checkValidID(id)) {
			setValidID(true);
		} else {
			setValidID(false);
		}
	}

	const getGoogleToken = async () => {
		try {
			const item = await AsyncStorage.getItem('token');
			return String(item)
		} catch (err) {
			console.log(err);
		}
	}


	const onSubmit = async function() {
		const authToken = await getGoogleToken();

    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/send_friend_request',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': authToken,
        Accept: 'application/json',
      },
      data: {
        'friendName' : friendID,
      }
    };

		axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
			onFriendChange("");
		})
		.catch(function (error) {
			console.log(error);
			onFriendChange("");
		});


	}

	const checkValidID = function(id) {
		return id.length > 0
	}

  return (
    <View style = {styles.Background}>
    	<View style = {styles.TitleContainer}>
    		<Text style = {styles.Title}>
    			Add Friend
    		</Text>
    	</View>

    	<View style = {styles.InputContainer}>
    		<View style = {styles.FriendContainer}>
    			<TextInput
						placeholder = "Enter friend id"
						placeholderTextColor= "grey"
						style = {styles.Input}
						onChangeText = {onFriendChange}
						value = {friendID}
    			>
    			</TextInput>
    		</View>

    		<View style = {styles.SubmitContainer}>
    			<Pressable style = {validID ? styles.ButtonValid : styles.ButtonInvalid} onPress =
    			{onSubmit} disabled = {!validID}>
    				<Text style = {styles.RequestText}>
    					Send Request
    				</Text>
    			</Pressable>
    		</View>

    	</View>

    	<View style = {styles.SeparatorContainer}>
    	</View>

    </View>
  )
}

export default AddFriendPage;
