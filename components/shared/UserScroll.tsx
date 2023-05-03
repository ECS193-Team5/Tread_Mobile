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