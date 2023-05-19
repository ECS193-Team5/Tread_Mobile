import React, { useState, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';

import {styles} from '../../css/add/friend/Style';
import { SharedStyles } from '../../css/shared/Style';
import {BACKEND_URL} from '@env';
import Invite from '../../components/shared/invite';
import axios from 'axios';
import getReccFriend from "../../routes/add/recommend_friend";
import UserScroll from '../../components/shared/UserScroll';
import ZeroItem from '../../components/shared/ZeroItem';

function AddFriendPage(props): JSX.Element {

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const layoutAnimConfig = {
    duration: 1000,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    delete: {
      duration: 200,
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const deleteItem = function(mData) {    
    console.log(mData.username)
    console.log("deleted request")
    const filteredData = mutuals.filter(item => item.username !== mData.username);
    setMutuals(filteredData)
    filteredData.length === 0 ? setCount(0) : null
    LayoutAnimation.configureNext(layoutAnimConfig) 
  }

  const handleRefresh = function(){
    getMutualFriends()
  }

	const getMutualFriends = function(){
		axios(getReccFriend())
			.then(function (response) {
				// console.log(response.data[0])
        var recommendedFriends = []
        for (let user of response.data){
          var data = {
            username : user[0],
            mutuals :  user[1]
          }
          recommendedFriends.push(data)
        }
        console.log(recommendedFriends)
				setMutuals(recommendedFriends)
        setCount(recommendedFriends.length)
			})
			.catch((error) => {
					console.log(error);
				}
			)
	}

  const [mutuals, setMutuals] = useState(getMutualFriends);
	const [count, setCount] = useState(0);

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
  <View style = {[styles.Background, {paddingTop:(Platform.OS === 'ios') ? "12%" : 0}]}>
    <View style = {{flex : 32}}> 
      <Invite
        text = 'Add Friend'
        config = {config}
        props = {props}
        pagetoNav = "AddFriend"
      />
    </View>

    <View style = {styles.SeparatorContainer}>
      <View style = {SharedStyles.seperator}/>
      <View style = {styles.SuggestedTitleContainer}>
      <Text style = {styles.Title}>
          Suggested Friends
        </Text>
      </View> 
      <View style = {styles.SuggestedUserContainer}>
        {count > 0 ?
          <UserScroll
            UserData={mutuals}
            handler = {deleteItem}
            UserRole = 'Mutual'
            onRefresh = {handleRefresh}
          />
        :
          <ZeroItem
            promptText={'No recommended friends yet'}
          />    
        }
      </View> 
    </View>

  </View>


  )
}

export default AddFriendPage;
