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
import Invite from '../../components/shared/invite';
import axios from 'axios';
import getReccFriend from "../../routes/add/recommend_friend";
import {resolve} from "react-native-svg/lib/typescript/lib/resolve";

function AddFriendPage(props): JSX.Element {

	const [mutuals, setMutuals] = useState([]);

	useEffect(() => {
		axios(getReccFriend())
			.then(function (response) {
				console.log(response.data)
				setMutuals(response.data)
			})
			.catch((error) => {
					console.log(error);
				}
			)

	},[])

	var config = {
	  method: 'post',
	  url: BACKEND_URL + 'friend_list/send_friend_request',
	  withCredentials: true,
	  credentials: 'include',
	  headers: {
		Accept: 'application/json',
	  },
	  data: {
		'friendName' : '',
	  }
	};

  return (
	<Invite
		text = 'Add Friend'
		config = {config}
    props = {props}
    pagetoNav = "AddFriend"
	/>
  )
}

export default AddFriendPage;
