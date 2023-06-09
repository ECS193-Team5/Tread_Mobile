import React, { useEffect, useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  Alert
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import {styles} from "../../css/challenges/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import { SharedStyles } from '../../css/shared/Style';

import {showMessage} from 'react-native-flash-message'
import {GestureHandlerRootView,Swipeable} from 'react-native-gesture-handler';

import axios from 'axios';
import {BACKEND_URL} from '@env';

function UserCard({UserInfo , Blocked, Friends, index, handler, UserRole, props, image, onRefresh}): JSX.Element {
  const getUsername = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'user/get_username',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    }

    axios(config)
      .then(function (response) {
        console.log(response.data)
        setCurrentUser(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const [SenderOrReceiver , setSenderOrReceiver] = useState("To")
  const [cardRole, setCardRole] = useState('')
  const [currentUser, setCurrentUser] = useState(getUsername)

  useEffect(() =>{
    setCardRole(UserInfo.role)
  })

  useEffect(() => {
    if (UserRole === 'Sent'){
      setSenderOrReceiver("To")
    } else {
      setSenderOrReceiver("From")
    }
  })

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
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/send_friend_request',
      withCredentials: true,
      credentials: 'include',
      headers: {
      Accept: 'application/json',
      },
      data: {
      'friendName' : UserInfo.username,
      }
    };

    axios(config)
    .then(function (response) {
      console.log('sent friend request ' + UserInfo.username)
      showMessage({
        floating : true,
        message : 'Sent Friend Request to ' + UserInfo.username,
        backgroundColor : '#014421',
        color : '#F9A800',
      })
      UserRole === 'Mutual' ?  null :  onRefresh()
    })
    .catch(function (error) {
      console.log(error)
      showMessage({
        floating : true,
        message : 'Error sending friend request to ' + UserInfo.username,
        type : 'danger',
      })
    })
  }


  const RemoveFriend = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/remove_friend',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        friendName : UserInfo.username
      }
    };

    axios(config)
      .then(function (response) {
        console.log('removed friend ' + UserInfo.username)
        showMessage({
          floating : true,
          message : 'Unfriended ' + UserInfo.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        if (UserRole === 'All Friends' || UserRole === 'Blocked Users'){
          handler(UserInfo, false)
        } else {
          onRefresh()
        }
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error unfriending ' + UserInfo.username,
          type : 'danger',
        })
      })
  }

  const clickedUnfriend = function(){
    Alert.alert('Unfriend ' + UserInfo.username + ' ?',
    'If you change your mind you will have to request to be friends with ' + UserInfo.username + ' again',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Unfriend',
        onPress: RemoveFriend,
        style : 'destructive'
      },
    ]);
  }

  const BlockUser = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/block_user',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        friendName : UserInfo.username
      }
    };

    axios(config)
      .then(function (response) {
        console.log('blocked user ' +  UserInfo.displayName)
        showMessage({
          floating : true,
          message : 'Blocked ' + UserInfo.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        if (UserRole === 'All Friends' || UserRole === 'Received' || UserRole === 'Sent' || UserRole === 'Mutual'){
          handler(UserInfo, UserRole === 'Received')
        } else {
          onRefresh()
        }
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error blocking ' + UserInfo.username,
          type : 'danger',
        })
      })
  }

  const clickedBlock = function(){
    Alert.alert('Block ' + UserInfo.username + ' ?',
    'If you change your mind you will have to unblock ' + UserInfo.username + ' later',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Block',
        onPress: BlockUser,
        style : 'destructive'
      },
    ]);
  }

  const KickUser = function(){
    console.log('kicked user ' +  UserInfo.displayName)
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/kick_member',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id,
        recipient : UserInfo.username,
        leagueName : props.route.params.leagueData.leagueName
      }
    };

    axios(config)
      .then(function (response) {
        console.log('kicked user ' +  UserInfo.displayName)
        showMessage({
          floating : true,
          message : 'Kicked ' + UserInfo.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        handler(UserInfo,false)
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error kicking ' + UserInfo.username,
          type : 'danger',
        })
      })
  }

  const clickedKick = function(){
    Alert.alert('Kick ' + UserInfo.username + ' ?',
    'This will remove ' + UserInfo.username + ' from your league',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Kick',
        onPress: KickUser,
        style : 'destructive'
      },
    ]);
  }

  const BanUser = function(){
    console.log('banned user ' +  UserInfo.displayName)
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/ban_user',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id,
        recipient : UserInfo.username,
        leagueName : props.route.params.leagueData.leagueName
      }
    };

    axios(config)
      .then(function (response) {
        console.log('banned user ' +  UserInfo.displayName)
        showMessage({
          floating : true,
          message : 'Banned ' + UserInfo.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        handler(UserInfo, false)
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error banning ' + UserInfo.username,
          type : 'danger',
        })
      })
  }

  const clickedBan = function(){
    Alert.alert('Ban ' + UserInfo.username + ' ?',
    'This will remove and ban ' + UserInfo.username + ' from your league',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ban',
        onPress: BanUser,
        style : 'destructive'
      },
    ]);
  }

  const unblockUser = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/unblock_user',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        friendName : UserInfo.username
      }
    };

    axios(config)
      .then(function (response) {
        console.log('unblock user friend ' +  UserInfo.displayName)
        showMessage({
          floating : true,
          message : 'Unblocked ' + UserInfo.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        if(UserRole === 'All Friends' || UserRole === 'Blocked Users'){
          handler(UserInfo, false)
        } else {
          onRefresh()
        }
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error unblocking ' + UserInfo.username,
          type : 'danger',
        })
      })
  }

  const RejectInvite = function(){
    var route = UserRole === 'Sent' ? 'friend_list/remove_sent_request' : 'friend_list/remove_received_request'
    var config = {
      method: 'post',
      url: BACKEND_URL + route,
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        friendName : UserInfo.username
      }
    };

    axios(config)
      .then(function (response) {
        showMessage({
          floating : true,
          message : UserRole === 'Sent' ? 'Unsent Invite to ' + UserInfo.username : 'Rejected Invite from ' + UserInfo.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        handler(UserInfo, UserRole === 'Received')
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error rejecting invite ' + UserInfo.username,
          type : 'danger',
        })
      })
  }

  const AcceptInvite = function(){
    console.log('accepted incoming request ' + UserInfo.username)
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/accept_received_request',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        friendName : UserInfo.username
      }
    };

    axios(config)
      .then(function (response) {
        console.log('added user friend ' +  UserInfo.displayName)
        showMessage({
          floating : true,
          message : 'Accepted Invite from  ' + UserInfo.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        handler(UserInfo, true)
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error accepting invite ' + UserInfo.username,
          type : 'danger',
        })
      })
  }

  const AdminAdd = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/add_admin',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id,
        recipient : UserInfo.username,
        leagueName : props.route.params.leagueData.leagueName
      }
    };

    axios(config)
      .then(function (response) {
        console.log('added admin ' +  UserInfo.displayName)
        showMessage({
          floating : true,
          message : 'Made ' + UserInfo.username + " an admin",
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        onRefresh()
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error making ' + UserInfo.username + ' an admin',
          type : 'danger',
        })
      })
  }

  const clickedAddAdmin = function(){
    Alert.alert('Make ' + UserInfo.username + ' an admin ?',
    'This will allow ' + UserInfo.username + ' to issue challenges and manage users and requests',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Make admin',
        onPress: AdminAdd,
        style : 'default'
      },
    ]);
  }

  const AdminRemove = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/remove_admin',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id,
        recipient : UserInfo.username,
        leagueName : props.route.params.leagueData.leagueName
      }
    };

    axios(config)
      .then(function (response) {
        console.log('removed admin ' +  UserInfo.displayName)
        showMessage({
          floating : true,
          message : 'Removed ' + UserInfo.username + " as an admin",
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        onRefresh()
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error removing ' + UserInfo.username + ' as an admin',
          type : 'danger',
        })
      })
  }

  const clickedRemoveAdmin = function(){
    Alert.alert('Remove ' + UserInfo.username + ' an admin ?',
    'This will remove ' + UserInfo.username + '\'s ability to issue challenges and manage users and requests',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove admin',
        onPress: AdminRemove,
        style : 'destructive'
      },
    ]);
  }


  const AdminRemoveSelf = function(){
    console.log('Removed Self as Admin')
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/user_remove_admin',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id,
      }
    };

    axios(config)
      .then(function (response) {
        console.log('removed admin ' +  UserInfo.displayName)
        showMessage({
          floating : true,
          message : 'Gave up admin rights',
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        onRefresh()
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error giving up admin rights',
          type : 'danger',
        })
      })
  }

  const clickedRemoveSelfAdmin = function(){
    Alert.alert('Give up admin status ?',
    'This will remove your ability to issue challenges and manage users and requests',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Give up admin rights',
        onPress: AdminRemoveSelf,
        style : 'destructive'
      },
    ]);
  }

  const unfriend = function() {
    return (
        <Pressable
          onPress={clickedUnfriend}
          style = {{margin : "4%"}}
          testID = "unfriend"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/iD9p5iH.png'}}/>
        </Pressable>
    );
  }

  const block = function() {
    return (
        <Pressable
          onPress={clickedBlock}
          style = {{margin : "4%"}}
          testID = "block"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/U7hfisP.png'}}/>
        </Pressable>
    );
  }

  const kick = function(){
    return (
        <Pressable
          onPress={clickedKick}
          style = {{margin : "4%"}}
          testID = "kick"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/ngSIL5J.png'}}/>
        </Pressable>
    );
  }

  const ban = function(){
    return (
        <Pressable
          onPress={clickedBan}
          style = {{margin : "4%"}}
          testID = "ban"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/nDGURiM.png'}}/>
        </Pressable>
    );
  }

  const unblock = function(){
    return (
        <Pressable
          onPress={unblockUser}
          style = {{margin : "4%"}}
          testID = "unblock"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/q7fgVdM.png'}}/>
        </Pressable>
    );
  }

  const addAdmin = function(){
    return (
        <Pressable
          onPress={clickedAddAdmin}
          style = {{margin : "4%"}}
          testID = "add admin"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/cQntMzs.png'}}/>
        </Pressable>
    );
  }

  const removeAdmin = function(){
    return (
        <Pressable
          onPress={clickedRemoveAdmin}
          style = {{margin : "4%"}}
          testID = "remove admin"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/7wDqjHS.png'}}/>
        </Pressable>
    );
  }


  const removeSelfAsAdmin = function(){
    return (
        <Pressable
          onPress={clickedRemoveSelfAdmin}
          style = {{margin : "4%"}}
          testID = "remove self admin"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/7wDqjHS.png'}}/>
        </Pressable>
    );
  }

  const rejectInvite = function(){
    return (
      <Pressable
        onPress={RejectInvite}
        style = {{margin : "4%"}}
        testID = 'Reject'
      >
        <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/Tt2kctJ.png'}}/>
      </Pressable>
    );
  }

  const addFriend = function(){
    return(
    <Pressable
      onPress={AddFriend}
      style = {{margin : "4%"}}
      testID = "add friend"
    >
      <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/ggWVwz6.png'}}/>
    </Pressable>
    )
  }

  const acceptInvite = function(){
    return(
      <Pressable
      onPress={AcceptInvite}
      testID = "Accept"
    >
      <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/PMJ1WhF.png'}}/>
    </Pressable>
    )
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
      if(cardRole === 'admin'){
        return (
          <View style={SharedStyles.RightSliderContainer}>
            {removeSelfAsAdmin()}
          </View>
        )
      }
    } else if(UserRole === 'Received' || UserRole === 'Sent'){
      return (
        <View style={[SharedStyles.MultipleRightSliderContainer, {width : "28%"}]}>
          {block()}
          {rejectInvite()}
        </View>
      );
    } else if(UserRole === 'All Friends' || UserRole === 'Blocked Users'){
        return (
          <View style={UserRole === 'Blocked Users' ? SharedStyles.RightSliderContainer : [SharedStyles.MultipleRightSliderContainer, {width : "28%"}]}>
            {UserRole === 'All Friends' ? unfriend() : null}
            {UserRole === 'All Friends' ? block() : unblock()}
          </View>
        );
    } else if (UserRole === 'Mutual'){
      return (
        <View style={[SharedStyles.RightSliderContainer]}>
          {addFriend()}
        </View>
      )
    }
    else {
      return (
        <View style={[SharedStyles.MultipleRightSliderContainer, {width : "28%"}]}>
          {(Friends && Friends.length > 0 && Friends.includes(UserInfo.username)) ? unfriend() : addFriend()}
          {(Blocked && Blocked.length > 0 && Blocked.includes(UserInfo.username)) ? unblock() : block()}
        </View>
      )
    }
  };

  const renderLeftActions = (progress, dragX, handler) => {
    if(currentUser === UserInfo.username || UserRole === 'All Friends' || UserRole === 'Blocked Users' || UserRole === 'Sent' ||
       UserRole === 'participant' || UserRole === 'Mutual' || cardRole === 'owner'){
      return null
    } else if (UserRole === 'Received') {
      return (
        <View style={SharedStyles.LeftSliderContainer}>
          {acceptInvite()}
        </View>
      );
    } else if (UserRole === 'Blocked Users'){
      return(
        <View style={SharedStyles.LeftSliderContainer}>
          {unblock()}
        </View>
      )
    } else {
      return (
        <View style={[SharedStyles.MultipleLeftSliderContainer, {width :'32%'}]}>
          {kick()}
          {ban()}
          {adminOptions()}
        </View>
      )
    }
  };

  const getUserInfo = function(){
    return (
      <View style = {[cardStyles.ChallengeNameContainer, {flexDirection : 'column'}]}>
        {UserRole === 'Mutual' ?
        null
        :
        <Text style = {cardStyles.ChallengeNameText}>
          {UserInfo.displayName}
        </Text>
        }
        <Text style = {[cardStyles.ChallengeNameText, {color : "#F9A800"}]}>
          {UserInfo.username}
        </Text>
      </View>
    )
  }

  const UserInfoOrRecipientInfo = function(){
    if (UserRole === 'Sent' || UserRole === 'Received'){
      return (
        <View style = {[cardStyles.ChallengeNameContainer, {flexDirection : 'column', flex : 40}]}>
          <Text style = {cardStyles.ChallengeNameText}>
            {SenderOrReceiver + " : "}
          </Text>
        </View>
      )
    } else {
      return getUserInfo()
    }
  }

  const isRoleInLeague = function(){
    if(UserRole === 'All Friends' || UserRole === 'Blocked Users'){
      return null
    } else if(UserRole === 'Sent' || UserRole === 'Received'){
      return getUserInfo()
    } else if (UserRole === 'Mutual'){
      return (
      <View style = {[cardStyles.ChallengeNameContainer, {alignItems : 'center'}]}>
          <Text style = {cardStyles.ChallengeNameText}>
            {UserInfo.mutuals + (UserInfo.mutuals === 1 ? ' Mutual Friend' : ' Mutual Friends')}
          </Text>
        </View>
      )
    } else {
      return (
        <View style = {[cardStyles.ChallengeNameContainer, {alignItems : 'center'}]}>
          <Text style = {cardStyles.ChallengeNameText}>
            {cardRole !== 'participant' ? cardRole.charAt(0).toUpperCase() + cardRole.slice(1) : null}
          </Text>
        </View>
      )
    }
  }

  return(
    <GestureHandlerRootView>
      <Swipeable
        key = {UserInfo.username}
        renderLeftActions={(progress, dragX) =>
          renderLeftActions(progress, dragX, handler)
        }
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, handler)
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
            {UserInfoOrRecipientInfo()}
            {isRoleInLeague()}
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default UserCard