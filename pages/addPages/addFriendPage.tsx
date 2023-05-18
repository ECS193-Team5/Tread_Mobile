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

  const getSeperatorContent = function(){
    return (
    <View style = {styles.TitleContainer}>
      <Text style = {styles.Title}>
          Suggested Friends
      </Text>
    </View> 
    )
  }

  return (
  <View style = {[styles.Background, {paddingTop:(Platform.OS === 'ios') ? "12%" : 0}]}>
    <View style = {{flex : 40}}> 
      <Invite
        text = 'Add Friend'
        config = {config}
        props = {props}
        pagetoNav = "AddFriend"
      />
    </View>

    <View style = {styles.SeparatorContainer}>
    </View>

  </View>


  )
}

export default AddFriendPage;
