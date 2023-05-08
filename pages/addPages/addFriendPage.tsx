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
  // useEffect(() =>{
  //   refreshData()
  // })
  
  // const getFriendList = function(){
  //   var config = {
  //     method: 'post',
  //     url: BACKEND_URL + 'friend_list/friend_list',
  //     withCredentials: true,
  //     credentials: 'include',
  //     headers: {
  //       Accept: 'application/json',
  //     }
  //   };
  
  //   axios(config)
  //     .then(function (response) {
  //       setFriendList(response.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  // const getPendingList = function(){
  //   var config = {
  //     method: 'post',
  //     url: BACKEND_URL + 'friend_list/received_request_list',
  //     withCredentials: true,
  //     credentials: 'include',
  //     headers: {
  //       Accept: 'application/json',
  //     }
  //   };
  
  //   axios(config)
  //     .then(function (response) {
  //       var usernames = []
  //       for(let user of response.data){
  //         usernames.push(user.username)
  //       }
  //       setPendingList(usernames)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  // const getSentList = function(){
  //   var config = {
  //     method: 'post',
  //     url: BACKEND_URL + 'friend_list/sent_request_list',
  //     withCredentials: true,
  //     credentials: 'include',
  //     headers: {
  //       Accept: 'application/json',
  //     }
  //   };
  
  //   axios(config)
  //     .then(function (response) {
  //       var usernames = []
  //       for(let user of response.data){
  //         usernames.push(user.username)
  //       }
  //       setSentList(usernames)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  // const getBlockedList = function(){
  //   var config = {
  //     method: 'post',
  //     url: BACKEND_URL + 'friend_list/blocked_list',
  //     withCredentials: true,
  //     credentials: 'include',
  //     headers: {
  //       Accept: 'application/json',
  //     }
  //   };
  
  //   axios(config)
  //     .then(function (response) {
  //       var usernames = []
  //       for(let user of response.data){
  //         usernames.push(user.username)
  //       }
  //       setBlockedList(usernames)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

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

  // const refreshData = function(){
  //   getFriendList(),
  //   getPendingList(),
  //   getSentList(),
  //   getBlockedList()
  // }
  
  // const [friendList , setFriendList] = useState([''])
  // const [pendingList , setPendingList] = useState([''])
  // const [sentList , setSentList] = useState([''])
  // const [blockedList , setBlockedList] = useState([''])
  // // refreshData()

  return (
	<Invite
		text = 'Add Friend'
		config = {config}
    props = {props}
    pagetoNav = "AddFriend"
    // existing={friendList}
    // pending= {pendingList}
    // sent = {sentList}
    // banned = {blockedList}
    // refresh = {refreshData}
	/>
  )
}

export default AddFriendPage;
