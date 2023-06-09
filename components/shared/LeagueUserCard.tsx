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

import {Swipeable} from 'react-native-gesture-handler';
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';

import {showMessage} from 'react-native-flash-message'
import axios from 'axios';
import {BACKEND_URL} from '@env';

function LeagueUserCard({MemberData, index, handler, pageTitle, id}): JSX.Element {
  const [SenderOrReceiver , setSenderOrReceiver] = useState("From")
  
  const [image, setImage] = useState(createProfilePictureURL(MemberData.username))

  useEffect(() => {
    if (pageTitle === 'sent'){
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

  const RejectInvite = function(){
    if (pageTitle === 'sent'){
      var config = {
        method: 'post',
        url: BACKEND_URL + 'league/undo_invite',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
        data : {
          leagueID : id,
          recipient : MemberData.username
        }
      };
    
      axios(config)
        .then(function (response) {
          console.log('unsent outgoing request league')
          showMessage({
            floating : true,
            message : 'Unsent request to ' + MemberData.username,
            backgroundColor : '#014421',
            color : '#F9A800',
          })
          handler(MemberData)
        })
        .catch(function (error) {
          console.log(error)
          showMessage({
            floating : true,
            message : 'Error unsending request to ' + MemberData.username,
            type : 'danger',
          })
        })
    } else {
      var config = {
        method: 'post',
        url: BACKEND_URL + 'league/decline_request',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
        data : {
          leagueID : id,
          recipient : MemberData.username
        }
      };
    
      axios(config)
        .then(function (response) {
          console.log('rejected incoming request league')
          showMessage({
            floating : true,
            message : 'Rejected request from' + MemberData.username,
            backgroundColor : '#014421',
            color : '#F9A800',
          })
          handler(MemberData)
        })
        .catch(function (error) {
          console.log(error)
          showMessage({
            floating : true,
            message : 'Error rejecting request from ' + MemberData.username,
            type : 'danger',
          })
        })
    }
  }

  const UnbanUser = function(){
    console.log('unbanned user league')
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/unban_user',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : id,
        recipient : MemberData.username
      }
    };
  
    axios(config)
      .then(function (response) {
        console.log('Unbanned ' +  MemberData.displayName)
        showMessage({
          floating : true,
          message : 'Unbanned ' + MemberData.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        handler(MemberData)
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error unbanning ' + MemberData.username,
          type : 'danger',
        })
      })
    handler(MemberData)
  }

  const AcceptInvite = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/accept_join_request',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : id,
        recipient : MemberData.username
      }
    };
  
    axios(config)
      .then(function (response) {
        console.log('accepted user ' +  MemberData.displayName)
        showMessage({
          floating : true,
          message : 'Accepted request from' + MemberData.username,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        handler(MemberData)
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error accepting request from ' + MemberData.username,
          type : 'danger',
        })
      })
  }
  
  const renderRightActions = (progress, dragX, handler) => {
    if (pageTitle === 'banned') {
      return (
        <View style={SharedStyles.RightSliderContainer}>
          <Pressable
            onPress={UnbanUser}
            testID = 'unban league user'
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/q7fgVdM.png'}}/>
          </Pressable>   
        </View>
      );
    } else {
      return (
        <View style={SharedStyles.RightSliderContainer}>
          <Pressable
            onPress={RejectInvite}
            testID = "reject league invite"
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/Tt2kctJ.png'}}/>
          </Pressable>   
        </View>
      );
    }
  };

  const renderLeftActions = (progress, dragX, handler) => {
    if (pageTitle === 'sent' || pageTitle === 'banned'){
      return ('')
    } else {
      return (
        <View style={SharedStyles.LeftSliderContainer}>
          <Pressable
            onPress={AcceptInvite}
            testID = "accept league invite"
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/PMJ1WhF.png'}}/>
          </Pressable>   
        </View>
      );
    }
  };

  return(
    <Swipeable
      key = {MemberData.username}
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
      <View style= {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}>
        <View style = {cardStyles.ImageContainer}>
          <Image style ={ImageStyles.single} source={{uri: image}}/>
        </View>

        <View style = {cardStyles.seperator}/>

        <View style = {cardStyles.ChallengeCardTextContainer}>
          {pageTitle === 'banned' ? 
            null : 
            <View style = {cardStyles.LeagueAddressContainer}>
              <Text style = {cardStyles.ChallengeNameText}>
                {SenderOrReceiver + " : "}
              </Text>
            </View>
          }
          <View style = {cardStyles.ChallengeNameContainer}>
            <Text style = {cardStyles.LeagueNameText}>
            {MemberData.displayName}
            </Text>
            <Text style = {[cardStyles.ChallengeNameText , {color : "#F9A800"}]}>
              {MemberData.username}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  )
}

export default LeagueUserCard