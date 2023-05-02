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

function AddFriendPage(props): JSX.Element {


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
	>
	</Invite>
  )
}

export default AddFriendPage;
