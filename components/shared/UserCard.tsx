import React, { useEffect, useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import {styles} from "../../css/challenges/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import { SharedStyles } from '../../css/shared/Style';

import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import { addons } from 'react-native';

function UserCard({UserInfo, index, handler, UserRole}): JSX.Element {
  const [SenderOrReceiver , setSenderOrReceiver] = useState("From")
  const [cardRole, setCardRole] = useState('')
  const [currentUser, setCurrentUser] = useState('Kauboy#8925')

  useEffect(() =>{
    setCardRole(UserInfo.role)
    // console.log(UserRole)
  })

  // Get image from cloudinary based on page title (receiver(sent) or sender(for received))
  const getImage = function() {
    return 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683165600&v=beta&t=EU0EmYCCgMEGnLTGtcZ64L70bjMBTWJIJAP6BjaYjdo'
  }

  const [image, setImage] = useState(getImage)

  let row: Array<any> = [];
  let prevOpenedRow;

  const closeRow = (index) => {
    console.log('closerow', index);
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const AddFriend = function(){
    console.log('sent friend request ' + UserInfo.username)
    //backend call here
  }

  const BlockUser = function(){
    console.log('blocked user ' +  UserInfo.displayName)
    //backend call here
  }

  const KickUser = function(){
    console.log('kicked user ' +  UserInfo.displayName)
    // backend call here 
    handler(UserInfo)
  }

  const BanUser = function(){
    console.log('banned user ' +  UserInfo.displayName)
    // backend call here 
    handler(UserInfo)
  }

  const AdminAdd = function(){
    console.log('added admin user ' +  UserInfo.displayName)
    // backend call here 
    // handler(UserInfo)
  }

  const AdminRemove = function(){
    console.log('removed admin user ' +  UserInfo.displayName)
    // backend call here 
    // handler(UserInfo)
  }
  
  const friend = function() {
    return (
        <Pressable
          onPress={AddFriend}
          style = {{margin : "4%"}}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/ggWVwz6.png'}}/>
        </Pressable>   
    ); 
  }

  const block = function() {
    return (
        <Pressable
          onPress={BlockUser}
          style = {{margin : "4%"}}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/U7hfisP.png'}}/>
        </Pressable>   
    );
  }

  const kick = function(){
    return (
        <Pressable
          onPress={KickUser}
          style = {{margin : "4%"}}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/ngSIL5J.png'}}/>
        </Pressable>   
    );
  }

  const ban = function(){
    return (
        <Pressable
          onPress={BanUser}
          style = {{margin : "4%"}}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/nDGURiM.png'}}/>
        </Pressable>   
    );
  }

  const addAdmin = function(){
    return (
        <Pressable
          onPress={AdminAdd}
          style = {{margin : "4%"}}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/cQntMzs.png'}}/>
        </Pressable>   
    );
  }

  const removeAdmin = function(){
    return (
        <Pressable
          onPress={AdminAdd}
          style = {{margin : "4%"}}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/7wDqjHS.png'}}/>
        </Pressable>   
    );
  }

  const adminOptions = function() {
    if(cardRole === 'admin'){
      return (removeAdmin())
    } else {
      return (addAdmin())
    }
  }
  
  const renderRightActions = (progress, dragX, handler) => {
    if (currentUser === UserInfo.username) {
      return null
    } else if (UserRole === 'participant' || cardRole === 'owner'){
      return(
        <View style={SharedStyles.RightSliderContainer}>
          {block()}
        </View>
      )
    } else {
      return (
        <View style={SharedStyles.MultipleRightSliderContainer}>
          {block()}
          {kick()}
          {ban()}
          {adminOptions()}
        </View>
      )
    }
  };

  const renderLeftActions = (progress, dragX, handler) => {
      if (currentUser === UserInfo.username) {
        return null
      } else {
        return (
          <View style={SharedStyles.LeftSliderContainer}>
            <Pressable
              onPress={AddFriend}
            >
              <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/ggWVwz6.png'}}/>
            </Pressable>   
          </View>
        );
      }
  };

  return(
    <Swipeable
      key = {UserInfo.username}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, handler)
      }
      renderLeftActions={(progress, dragX) =>
        renderLeftActions(progress, dragX, handler)
      }
      onSwipeableOpen={() => closeRow(index)}
      ref={(ref) => (row[index] = ref)}
      friction = {1.5}
      leftThreshold = {30}
      rightThreshold = {30}
      childrenContainerStyle = {styles.FlatListContainer}>
      <View style= {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp, UserInfo.username === currentUser ? {borderColor : '#014421', borderWidth : 2} : null]}>
        <View style = {cardStyles.ImageContainer}>
          <Image style ={ImageStyles.single} source={{uri: image}}/>
        </View>

        <View style = {cardStyles.seperator}/>

        <View style = {cardStyles.ChallengeCardTextContainer}>
          <View style = {[cardStyles.ChallengeNameContainer, {flexDirection : 'column'}]}>
            <Text style = {cardStyles.ChallengeNameText}>
              {UserInfo.displayName}
            </Text>
            <Text style = {[cardStyles.ChallengeNameText, {color : "#F9A800"}]}>
              {UserInfo.username}
            </Text>
          </View>
          <View style = {[cardStyles.ChallengeNameContainer, {alignItems : 'center'}]}>
            <Text style = {cardStyles.ChallengeNameText}>
              {UserInfo.role !== 'participant' ? UserInfo.role.charAt(0).toUpperCase() + UserInfo.role.slice(1) : null}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  )
}

export default UserCard