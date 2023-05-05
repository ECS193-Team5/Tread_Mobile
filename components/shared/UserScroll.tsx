import React, { useEffect, useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
  RefreshControl,
} from 'react-native';

import UserCard from './UserCard';
import {styles} from "../../css/challenges/Style"
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';


function UserScroll({UserData, handler, UserRole, props, onRefresh}): JSX.Element {
  const [refreshing, setRefreshing] = useState(false)

  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      onRefresh()
      setRefreshing(false);
      }, 3000);
  }

  const getImage = function(item) {
    return createProfilePictureURL(item.username)
  }
  
  const renderUser = ({item, index}) => {    
    return (
    <UserCard 
      UserInfo = {item}
      index = {index}
      handler = {handler}
      UserRole = {UserRole}
      props = {props}
      image = {getImage(item)}
    />
    )
  }

  return (
    <FlatList
      data = {UserData}
      renderItem = {renderUser}
      refreshControl ={
        <RefreshControl 
          refreshing = {refreshing} 
          onRefresh = {Refresh} 
          colors = {'#014421'} 
          tintColor = {'#014421'}
          progressViewOffset = {-10}
        />
      }
  />
  )
}

export default UserScroll