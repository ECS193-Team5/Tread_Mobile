import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList,
  RefreshControl,
  Pressable,
  TouchableHighlight
} from 'react-native';

import {styles} from "../css/challenges/Style"
import IncomingSwap from '../components/shared/IncomingSwap';
import axios from 'axios';
import {BACKEND_URL} from '@env';
import ZeroItem from '../components/shared/ZeroItem';
import { useFocusEffect } from '@react-navigation/native';
import NotifCard from '../components/profile/notifCard';

import {useSelector, useDispatch } from 'react-redux';
import {badgeP_decrement, badgeP_increment} from '../redux/actions/badgeP_actions'
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileInbox(props): JSX.Element {
  const dispatch = useDispatch()
  const count = useSelector(state=>state.badgeP_reducer.badgeP)

  const clearAll = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'notifications/delete_all_notifications',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };

    axios(config)
      .then(async function (response) {
        setNotifs([])
        setNotifsCount(0)
        dispatch(badgeP_increment(0))
        console.log('Setting async storage to ' + 0)
        await AsyncStorage.setItem('Notifs', JSON.stringify(0))
        showMessage({
          floating : true,
          message : 'Cleared all Notifications',
          backgroundColor : '#014421',
          color : '#F9A800',
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

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
      .then(async function (response) {
        setNotifs(response.data)
        setNotifsCount(response.data.length)
        console.log('Setting async storage to ' + response.data.length)
        await AsyncStorage.setItem('Notifs', JSON.stringify(response.data.length))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  const [notifs, setNotifs] = useState(getNotifs)
  const [countNotifs, setNotifsCount] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      getNotifs()
      setTimeout(() => {
        dispatch(badgeP_increment(0))
        }, 3000);
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
    dispatch(badgeP_decrement())
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
      <View style = {styles.NotificationTitleContainer}>
        <Text style = {styles.TitleText }>Notifications </Text>
        {count > 0 ?
          <View style = {styles.CountandClearContainer}>
            <View style ={styles.NotificationCountContainer}>
              <Text style = {styles.NotificationCountText}> {count > 99 ? '99+' : count}</Text>
            </View>
          </View>
          :
          null
        }
        <TouchableHighlight
        onPress={clearAll}
        underlayColor = '#013319'
        style = {[(countNotifs > 0 ? styles.ClearAllValidContainer : styles.ClearAllInvalidContainer), {marginHorizontal : '9%'}]}
        disabled = {!countNotifs}
        >
          <Text style = {styles.ClearAllText}>Clear All </Text> 
        </TouchableHighlight>
      </View>

      <View style = {styles.ChallengesContainer}>
        {countNotifs > 0 ?
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