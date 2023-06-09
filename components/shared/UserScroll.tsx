import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
} from 'react-native';

import UserCard from './UserCard';
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';

function UserScroll({UserData, Blocked, Friends,  handler, UserRole, props, onRefresh, reRender}): JSX.Element {
  const [refreshing, setRefreshing] = useState(false)
  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      onRefresh()
      setRefreshing(false);
      }, 450);
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
      onRefresh = {onRefresh}
      Blocked = {Blocked}
      Friends = {Friends}
    />
    )
  }

  return (
    <FlatList
      data = {UserData}
      renderItem = {renderUser}
      extraData = {reRender}
      refreshControl ={
        <RefreshControl
          refreshing = {refreshing}
          onRefresh = {Refresh}
          colors = {['#014421']}
          tintColor = {'#014421'}
          progressViewOffset = {-10}
        />
      }
      testID = "user scroll"
  />
  )
}

export default UserScroll