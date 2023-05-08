import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableHighlight,
  Alert,
} from 'react-native';
 
import Modal from "react-native-modal"
import SwitchSelector from "react-native-switch-selector"
import {styles} from "../css/challenges/Style"
import { LeagueStyles} from '../css/leagues/Style';
import {cardStyles} from "../css/cards/Style"
import IncomingSwap from '../components/shared/IncomingSwap';
import { ImageStyles } from '../css/imageCluster/Style';
import ChallengeScroll from '../components/shared/ChallengeScroll';
import LeagueMemberView from '../components/Leagues/LeagueMemberView';
import GestureRecognizer from 'react-native-swipe-gestures';
import QRModalPopUp from '../components/shared/QRModalPopUp';
import { createLeaguePictureURL } from '../components/Helpers/CloudinaryURLHelper';

import axios from 'axios';
import {BACKEND_URL} from '@env';
import { modalstyle } from '../css/shared/modalStyle';
import MenuPopUp from '../components/shared/MenuPopUp';

function LeagueDetails(props): JSX.Element {
  const getChallengeData = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'challenges/league_challenges',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id
      }
    };
  
    axios(config)
      .then(function (response) {
        setLeagueChallenges(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const getLeagueMembers = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_member_list',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id
      }
    };
  
    axios(config)
      .then(function (response) {
        setLeagueMembers(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const getLeagueInfo = function(){
    console.log(props.route.params.leagueData._id)
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_league_name_description_type',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id
      }
    };
  
    axios(config)
      .then(function (response) {
        setSecurity(response.data['leagueType'])
        setDescription(response.data['leagueDescription'])
      })
      .catch((error) =>
        console.log(error)
      )
  }
  
  
  var imageUrl = "https://imgur.com/nFRNXOB.png"  
  var LeagueImage = createLeaguePictureURL(props.route.params.leagueData._id)

  const [modalVisibleQR, setModalVisibleQR] = useState(false)
  const [modalVisiblePopUp, setModalVisiblePopUp] = useState(false)

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
  
  const options = [
    { label : "Members" , value : true},
    { label : "Challenges", value : false}
  ]

  const getRole = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_role',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id
      }
    }
  
    axios(config)
      .then(function (response) {
        setRole(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const [isMembers, setIsMembers] = useState("Members")
  const [description, setDescription] = useState('description')
  const [security, setSecurity] = useState('private')
  getLeagueInfo()

  const [LeagueMembers, setLeagueMembers] = useState(getLeagueMembers)
  const [LeagueChallenges, setLeagueChallenges] = useState(getChallengeData)
  const [role, setRole] = useState('')
  getRole()

  const handlePopup = function() {
    setModalVisiblePopUp(true)
  }

  const handleLeave = function() {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/leave_league',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id
      }
    };
  
    axios(config)
      .then(function (response) {
        console.log('leave')
        props.route.params.refresh()   
        props.navigation.navigate("Leagues")
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const handleEdit = function() {
    console.log('edit')
  }

  const handleRefresh = function() {
    if (isMembers){
      getLeagueMembers()
    } else {
      getChallengeData()
    }
  }

  const handleQR = function() {
    console.log("QR")
    setModalVisibleQR(true)
    //backend call to leave league
    // props.navigation.navigate("Leagues")
  }

  const clickedLeave = function(){
    setModalVisiblePopUp(false)
    Alert.alert('Leave ' + props.route.params.leagueData.leagueName + ' ?', 
    security === 'private' ? 'You are about to leave this league' : 'If you change your mind you will have to request to join again',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Leave', 
        onPress: handleLeave,
        style : 'destructive'
      },
    ]);
  }

  const LeaveClickable = function(){
    return (
      <TouchableHighlight
        onPress={clickedLeave}
        style = {{borderBottomRightRadius : 20, borderBottomLeftRadius : 20}}
        underlayColor = 'rgba(0,0,0,0.15)'
      >
        <View style = {{flexDirection : 'row', marginVertical : '2%'}} >
          <Text style = {[modalstyle.PopUpOptionText, {color:'red', flex : 50}]}> Leave </Text>
          <Image style ={ImageStyles.Leave} source={{uri: 'https://imgur.com/FgqDfgA.png'}}/>
        </View>
      </TouchableHighlight>
    )
  }

  const EditClickable = function(){
    return(
      <TouchableHighlight
      onPress={handleEdit}
      style = {{borderTopRightRadius : 20, borderTopLeftRadius : 20}}
      underlayColor = 'rgba(0,0,0,0.15)'
      >
        <View style = {{flexDirection : 'row', marginVertical : '2%'}} >
          <Text style = {[modalstyle.PopUpOptionText , {flex : 50}]}> Edit </Text>
          <Image style ={ImageStyles.Edit} source={{uri: 'https://imgur.com/tRs9SvT.png'}}/>
        </View>
      </TouchableHighlight>
    )
  }

  const getOptions = function(){
    var options = []
    if(role === 'owner' || role === 'admin'){
      options.push(EditClickable)
    } 
    if (role === 'admin' || role === 'participant'){
      options.push(LeaveClickable)
    }
    return options
  }

  return (
    <View style = {styles.container}>
      <GestureRecognizer
        onSwipeDown={() => setModalVisibleQR(false)}
      >
        <Modal
          isVisible={modalVisibleQR}
          hasBackdrop = {true}
          backdropColor = 'black'
          style = {{margin : 2}}
        >
          <QRModalPopUp
            Name = {props.route.params.leagueData.leagueName}
            idUserName = {props.route.params.leagueData._id}
            isLeague = {true}
            security = {security}
          />
        </Modal>
      </GestureRecognizer>

      <Modal
        isVisible={modalVisiblePopUp}
        hasBackdrop = {true}
        backdropColor = 'rgba(0,0,0,0.7)'
        onBackdropPress = { () => setModalVisiblePopUp(false)}
        style = {{margin : 2}}
        animationIn = 'fadeIn'
        animationInTiming={160}
        animationOut = 'fadeOut'
        animationOutTiming={100}
      >
        <MenuPopUp
          options = {getOptions()}
        />
      </Modal>

      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Leagues"}
          imageUrl = {imageUrl}/>
      </View>

      <View style = {LeagueStyles.LeagueInfoCardContainer}>
        <View style = {[LeagueStyles.LeagueInfoCard, cardStyles.shadowProp]}>   
          <View style = {LeagueStyles.LeagueInfoContainer}> 
            <View style = {LeagueStyles.LeagueImageContainer}>
              <Image style ={ImageStyles.LeagueImage} source={{uri: LeagueImage}}/>
            </View>
        
            <View style = {LeagueStyles.LeagueNameContainer}>
              <Text style = {[styles.TitleText, {fontSize : 25, marginVertical: '-3%%'}]}>{props.route.params.leagueData.leagueName}</Text>
              <Text style = {[styles.TitleText, {fontSize : 13, marginBottom: '-2%'}]}>{description}</Text>
              <Text style = {[styles.TitleText, {fontSize : 13, marginBottom: '-7%'}]}>{security.charAt(0).toUpperCase() + security.slice(1)}</Text>
              <Text style = {[styles.TitleText, {fontSize : 13, marginBottom: '-7%'}]}>{props.route.params.leagueData.activeChallenges + ' Active Challenges'}</Text>
              <Text style = {[styles.TitleText, {fontSize : 13, marginBottom: '-7%'}]}>{props.route.params.leagueData.members.length + ' Members'}</Text>
            </View>            
          </View>
        
          <View style = {[LeagueStyles.ToggleContainer]}>
            <Pressable
              onPress={handlePopup}
            >
              <Image style ={ImageStyles.Options} source={{uri: 'https://imgur.com/G0SHXKl.png'}}/>
            </Pressable>
            <View style = {LeagueStyles.ToggleContainer}>
              <SwitchSelector
                initial= {0}
                onPress = {value => setIsMembers(value)}
                textColor = {'#014421'}
                selectedColor = {'#F9A800'}
                buttonColor = {'#014421'}
                hasPadding
                options = {options}
              />
            </View>

            <Pressable
              onPress={() => handleQR()}
            >
              <Image style ={ImageStyles.QR} source={{uri: 'https://imgur.com/cC2QHxO.png'}}/>
            </Pressable>
          </View>
        </View>
      </View>

      <View style = {styles.seperator}/>

      {isMembers ? 
        <LeagueMemberView
          MemberData={LeagueMembers}
          setLeagueMembers = {setLeagueMembers}
          props = {props}
          onRefresh = {handleRefresh}
        /> 
      : 
      <View style = {LeagueStyles.MembersChallengesContainer}>
        <ChallengeScroll
          ChallengeData={LeagueChallenges}
          isCurrent = {true}
          onRefresh = {handleRefresh}
        />
      </View>
      } 
    </View>
  )
}

export default LeagueDetails;