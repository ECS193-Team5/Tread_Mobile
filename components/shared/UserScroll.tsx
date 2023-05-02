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
} from 'react-native';

import UserCard from './UserCard';
import {styles} from "../../css/challenges/Style"

function UserScroll({UserData, handler, UserRole}): JSX.Element {
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

  const renderUser = ({item, index}) => {
    return (
    <UserCard 
      UserInfo = {item}
      index = {index}
      handler = {handler}
      UserRole = {UserRole}
    />
    )
  }

  return (
    <FlatList
      data = {UserData}
      renderItem = {renderUser}
  />
  )
}

export default UserScroll