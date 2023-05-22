import React, { useEffect, useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text
} from 'react-native';

import axios from 'axios';
import {BACKEND_URL} from '@env';

import {cardStyles} from "../../css/cards/Style"
import {styles} from "../../css/challenges/Style"
import { ImageStyles } from '../../css/imageCluster/Style';

import { SharedStyles } from '../../css/shared/Style';

import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import { createLeaguePictureURL } from '../Helpers/CloudinaryURLHelper';
import { showMessage } from 'react-native-flash-message';

function LeagueInviteCard({LeagueData, index, handler, pageTitle}): JSX.Element {
  const [SenderOrReceiver , setSenderOrReceiver] = useState("From")
  
  var image = createLeaguePictureURL(LeagueData._id)

  useEffect(() => {
    if (pageTitle === 'Sent'){
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
    if (pageTitle === 'Sent'){
      // backend call here 
      var config = {
        method: 'post',
        url: BACKEND_URL + 'league/user_undo_request',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
        data : {
          leagueID : LeagueData._id
        }
      };
    
      axios(config)
        .then(function (response) {
          console.log('unsent outgoing request league')
          showMessage({
            floating : true,
            message : 'Unsent request to ' + LeagueData.leagueName,
            backgroundColor : '#014421',
            color : '#F9A800',
          })
          handler(LeagueData, false)
        })
        .catch(function (error) {
          console.log(error)
          showMessage({
            floating : true,
            message : 'Error unsending request to ' + LeagueData.leagueName,
            type : 'danger',
          })
        })
    } else {
      // backend call here
      var config = {
        method: 'post',
        url: BACKEND_URL + 'league/user_decline_invite',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
        data : {
          leagueID : LeagueData._id
        }
      };
    
      axios(config)
        .then(function (response) {
          console.log('rejected incoming request')
          showMessage({
            floating : true,
            message : 'Rejected request from ' + LeagueData.leagueName,
            backgroundColor : '#014421',
            color : '#F9A800',
          })
          handler(LeagueData, true)
        })
        .catch(function (error) {
          console.log(error)
          showMessage({
            floating : true,
            message : 'Error rejecting request from ' + LeagueData.leagueName,
            type : 'danger',
          })
        })
    }
  }

  const AcceptInvite = function(){
    console.log('accepted incoming request')
    //backend call here
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/user_accept_invite',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : LeagueData._id
      }
    };
  
    axios(config)
      .then(function (response) {
        console.log('accepted incoming request')
        showMessage({
          floating : true,
          message : 'Accepted request from ' + LeagueData.leagueName,
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        handler(LeagueData, true)
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error accepting request from ' + LeagueData.leagueName,
          type : 'danger',
        })
      })
  }

  const SendInvite = function(){
    console.log('send invite to league')

    //backend call here
      var config = {
        method: 'post',
        url: BACKEND_URL + 'league/user_request_to_join',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
        data: {
          leagueID: LeagueData._id
        }
      };
  
      axios(config)
        .then(function (response) {
          handler(LeagueData, false)
          showMessage({
            floating : true,
            message : 'Joined League',
            backgroundColor : '#014421',
            color : '#F9A800',
          })
        })
        .catch((error) =>{
          console.log(error);
          showMessage({
            floating : true,
            message : 'Error joining league',
            type : 'danger',
          })
        })
    }
  
  const renderRightActions = (progress, dragX, handler) => {
    if(pageTitle === 'suggested'){
      return (
        <View style={SharedStyles.RightSliderContainer}>
        <Pressable
          onPress={SendInvite}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/JP8ae2t.png'}}/>
        </Pressable>   
      </View>
      )
      return null
    } else {
      return (
        <View style={SharedStyles.RightSliderContainer}>
          <Pressable
            onPress={RejectInvite}
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/Tt2kctJ.png'}}/>
          </Pressable>   
        </View>
      );
    }
  };

  const renderLeftActions = (progress, dragX, handler) => {
    if (pageTitle === 'Sent' || pageTitle === 'suggested'){
      return ('')
    } else {
      return (
        <View style={SharedStyles.LeftSliderContainer}>
          <Pressable
            onPress={AcceptInvite}
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/PMJ1WhF.png'}}/>
          </Pressable>   
        </View>
      );
    }
  };

  return(
    <GestureHandlerRootView>
      <Swipeable
        key = {LeagueData._id}
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
            {pageTitle !== 'suggested' ? 
              <View style = {cardStyles.LeagueAddressContainer}>
                <Text style = {cardStyles.ChallengeNameText}>
                  {SenderOrReceiver + " : "}
                </Text>
              </View>
              :
              null
            }
            {pageTitle !== 'suggested' ? 
              <View style = {cardStyles.ChallengeNameContainer}>
                <Text style = {cardStyles.LeagueNameText}>
                  {LeagueData.leagueName}
                </Text>
                <Text style = {cardStyles.ChallengeNameText}>
                  {LeagueData.members.length + (LeagueData.members.length > 1 ? " Members" : " Member")}
                </Text>
                <Text style = {[cardStyles.ChallengeNameText , {color : "#F9A800"}]}>
                  {LeagueData.activeChallenges + " Active Challenges"}
                </Text>
              </View>
              :
              <View style = {cardStyles.ChallengeNameContainer}>
                <Text style = {cardStyles.LeagueNameText}>
                  {LeagueData.leagueName}
                </Text>
              </View>
            }
          </View>
        </View>
      </Swipeable>

    </GestureHandlerRootView>
  )
}

export default LeagueInviteCard