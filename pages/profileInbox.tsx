import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList,
  RefreshControl
} from 'react-native';

import {styles} from "../css/challenges/Style"
import IncomingSwap from '../components/shared/IncomingSwap';
import axios from 'axios';
import {BACKEND_URL} from '@env';
import ZeroItem from '../components/shared/ZeroItem';
import { useFocusEffect } from '@react-navigation/native';
import NotifCard from '../components/profile/notifCard';

function ProfileInbox(props): JSX.Element {

  const getNotifs = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'notifications/get_notifications',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };

    axios(config)
      .then(function (response) {
        setNotifs(response.data)
        setCount(response.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  const [notifs, setNotifs] = useState(getNotifs)
  const [count, setCount] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      getNotifs()
    }, [])
  );

  const handleRefresh = function(){
    getNotifs()
  }

  var imageUrl = "https://imgur.com/nFRNXOB.png"

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

  const deleteItem = function(nData) {
    console.log(nData._id)
    console.log(nData.message)
    console.log("deleted")
    const filteredData = notifs.filter(item => item._id !== nData._id);
    setNotifs(filteredData)
    filteredData.length === 0 ? setCount(0) : null
    LayoutAnimation.configureNext(layoutAnimConfig)
  }

  const [refreshing, setRefreshing] = useState(false)

  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      handleRefresh()
      setRefreshing(false);
      }, 450);
  }

  const renderNotif = ({item, index}) => {
    return (
      <NotifCard
        item={item}
        index = {index}
        handler = {deleteItem}
      />
    )
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Profile"}
          imageUrl = {imageUrl}/>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>Notifications</Text>
      </View>
      <View style = {styles.ChallengesContainer}>
        {count > 0 ?
          <FlatList
            data = {notifs}
            renderItem = {renderNotif}
            refreshControl ={
             <RefreshControl 
               refreshing = {refreshing} 
               onRefresh = {Refresh} 
               colors = {['#014421']}
               tintColor = {'#014421'}
               progressViewOffset = {-10}
             />
           }
         />
         :
            <ZeroItem
              promptText={'No notifications'}
              defaultView = {false}
            />
         }
      </View>
    </View>
  )
}

export default ProfileInbox