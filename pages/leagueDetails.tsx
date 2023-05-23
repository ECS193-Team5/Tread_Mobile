import React, { useEffect, useState } from 'react';
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
  Keyboard,
  AppState,
} from 'react-native';

import Modal from "react-native-modal"
import SwitchSelector from "react-native-switch-selector"
import {styles} from "../css/challenges/Style"
import { LeagueStyles} from '../css/leagues/Style';
import {cardStyles} from "../css/cards/Style"
import { ImageStyles } from '../css/imageCluster/Style';
import ChallengeScroll from '../components/shared/ChallengeScroll';
import LeagueMemberView from '../components/Leagues/LeagueMemberView';
import QRModalPopUp from '../components/shared/QRModalPopUp';
import { createLeaguePictureURL } from '../components/Helpers/CloudinaryURLHelper';

import axios from 'axios';
import {BACKEND_URL} from '@env';
import { modalstyle } from '../css/shared/modalStyle';
import MenuPopUp from '../components/shared/MenuPopUp';
import { showMessage } from 'react-native-flash-message';
import ZeroItem from '../components/shared/ZeroItem';
import LeagueLeaderboard from '../components/Leagues/LeagueLeaderboard';
import { useFocusEffect } from '@react-navigation/native';

const options = [
  { label : "Members" , value : 0},
  { label : "Challenges", value : 1},
  { label : 'Leaderboard', value : 2}
]

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
        setCountChallenges(response.data.length)
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
        setCountMembers(response.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getBlockedUsers = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/blocked_list',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        console.log(response.data)
        var blocked_usernames = []
        for (let user of response.data){
          blocked_usernames.push(user.username)
        }
        console.log(blocked_usernames)
        setBlockedUsers(blocked_usernames)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getFriends = function (){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/friend_list',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        console.log(response.data)
        setFriends(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getLeagueInfo = function(){
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
        setName(response.data['leagueName'])
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

  const [isMembers, setIsMembers] = useState(0)
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')

  const [security, setSecurity] = useState('')
  const [countMembers, setCountMembers] = useState(0)
  const [countChallenges, setCountChallenges] = useState(0)

  const [LeagueMembers, setLeagueMembers] = useState(getLeagueMembers)
  const [LeagueChallenges, setLeagueChallenges] = useState(getChallengeData)
  const [BlockedUsers , setBlockedUsers] = useState([])
  const [Friends , setFriends] = useState(getFriends)

  const [role, setRole] = useState('')


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
        showMessage({
          floating : true,
          message : 'Left League',
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        props.route.params.refresh()
        props.navigation.navigate("Leagues")
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error leaving league',
          type : 'danger',
        })
      })
  }

  const handleEdit = function() {
    console.log('edit')
    setModalVisiblePopUp(false)
    props.navigation.navigate('EditLeague', {leagueData : props.route.params.leagueData, name : name ,  description : description, security : security})
  }

  const deleteLeague = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/delete_league',
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
        showMessage({
          floating : true,
          message : 'Deleted League',
          backgroundColor : '#014421',
          color : '#F9A800',
        })
        props.route.params.refresh()
        props.navigation.navigate("Leagues")
      })
      .catch(function (error) {
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error deleting league',
          type : 'danger',
        })
      })
  }

  const handleDelete = function() {
    console.log('Delete')
    setModalVisiblePopUp(false)
    Alert.alert('Delete ' + name + ' ?', 
    'This will permanently delete your league. You will lose all the previous challenges, leaderboard, and history. There will be no recovery',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete League', 
        onPress: deleteLeague,
        style : 'destructive'
      },
    ]);
   }

   useFocusEffect(
    React.useCallback(() => {
      if (isMembers === 0){
        getLeagueMembers()
        getBlockedUsers()
        getFriends()
      } else if (isMembers === 1){
        getChallengeData()
      } else {
        getLeaderboardInfo()
      }
    }, [isMembers])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleRefresh)
    return () => {
      subscription.remove()
    }
  }, [])

  const handleRefresh = function() {
    if (isMembers === 0){
      getLeagueMembers()
      getBlockedUsers()
      getFriends()
    } else if (isMembers === 1){
      getChallengeData()
    } else {
      getLeaderboardInfo()
    }
  }

  const handleQR = function() {
    console.log("QR")
    setModalVisibleQR(true)
  }

  const clickedLeave = function(){
    setModalVisiblePopUp(false)
    Alert.alert('Leave ' + name + ' ?',
    security === 'private' ? 'You are about to leave this league' : 'If you change your mind you will have to request to join again',
    [
      {
        text: 'Cancel',
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
        style = {{borderRadius : 20}}
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
      style = {{borderTopLeftRadius : 20, borderTopRightRadius : 20}}
      underlayColor = 'rgba(0,0,0,0.15)'
      >
        <View style = {{flexDirection : 'row', marginVertical : '2%'}} >
          <Text style = {[modalstyle.PopUpOptionText , {flex : 50}]}> Edit </Text>
          <Image style ={ImageStyles.Edit} source={{uri: 'https://imgur.com/tRs9SvT.png'}}/>
        </View>
      </TouchableHighlight>
    )
  }

  const DeleteClickable = function(){
    return(
      <TouchableHighlight
      onPress={handleDelete}
      style = {{borderBottomLeftRadius : 20, borderBottomRightRadius : 20}}
      underlayColor = 'rgba(0,0,0,0.15)'
      >
        <View style = {{flexDirection : 'row', marginVertical : '2%'}} >
          <Text style = {[modalstyle.PopUpOptionText , {flex : 50, color : 'red'}]}> Delete </Text>
          <Image style ={ImageStyles.Edit} source={{uri: 'https://i.imgur.com/Tt2kctJ.png'}}/>
        </View>
      </TouchableHighlight>
    )
  }

  const getOptions = function(){
    var options = []
    if(role === 'owner'){
      options.push(EditClickable)
      options.push(DeleteClickable)
    }
    if (role === 'admin' || role === 'participant'){
      options.push(LeaveClickable)
    }
    return options
  }

  const getLeaderboardInfo = function(){
    var route = 'league/get_leaderboard'
    var config = {
      method: 'post',
      url: BACKEND_URL + route,
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
        setLeaderboardInfo(response.data)
        setCountLeaderboard(response.data.length)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const [leaderboardInfo, setLeaderboardInfo] = useState([])
  const [countLeaderboard, setCountLeaderboard] = useState(0)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if(!load){
      getLeaderboardInfo(),
      getRole(),
      setLoad(true)
      getLeagueInfo()
    }
  }, [load])
  
  return (
    <View style = {styles.container}>
        <Modal
          isVisible={modalVisibleQR}
          hasBackdrop = {true}
          backdropColor = 'black'
          swipeDirection = 'down'
          onSwipeComplete={(e) => setModalVisibleQR(false)}
          onBackdropPress = { () => setModalVisibleQR(false)}
          style = {{margin : 2}}
        >
          <QRModalPopUp
            Name = {name}
            idUserName = {props.route.params.leagueData._id}
            isLeague = {true}
            security = {security}
            encodedInfo={props.route.params.leagueData._id}
          />
        </Modal>

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

      <View style = {{flex : 2}}/>

      <View style = {LeagueStyles.LeagueInfoCardContainer}>
        <View style = {[LeagueStyles.LeagueInfoCard, cardStyles.shadowProp]}>
          <View style = {LeagueStyles.LeagueInfoContainer}>
            <View style = {LeagueStyles.LeagueImageContainer}>
              <Image style ={ImageStyles.LeagueImage} source={{uri: LeagueImage}}/>
            </View>

            <View style = {LeagueStyles.LeagueNameContainer}>
              <Text style = {[styles.TitleText, {fontSize : 25}]}>{name}</Text>
              <Text style = {[styles.TitleText, {fontSize : 13, marginBottom: '-2%'}]}>{description}</Text>
              <Text style = {[styles.TitleText, {fontSize : 13, marginBottom: '-7%'}]}>{security.charAt(0).toUpperCase() + security.slice(1)}</Text>
              <Text style = {[styles.TitleText, {fontSize : 13, marginBottom: '-7%'}]}>{countMembers + ' Members'}</Text>
              <Text style = {[styles.TitleText, {fontSize : 13, marginBottom: '-7%'}]}>{countChallenges + ' Active Challenges'}</Text>
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

      {isMembers === 0 &&
          <LeagueMemberView
            MemberData={LeagueMembers}
            Blocked = {BlockedUsers}
            Friends = {Friends}
            setLeagueMembers = {setLeagueMembers}
            props = {props}
            onRefresh = {handleRefresh}
            count = {countMembers}
            setCount = {setCountMembers}
        />
      }

      {isMembers === 1 &&
          <View style = {LeagueStyles.MembersChallengesContainer}>
          <View style = {[styles.ChallengesContainer, {marginBottom : "19%"}]}>
          {countChallenges > 0 ?
            <ChallengeScroll
              ChallengeData={LeagueChallenges}
              isCurrent = {true}
              onRefresh = {handleRefresh}
            />
          :
          <ZeroItem
            promptText='There are no challenges at the moment'
            navigateToText= {role === 'admin' || role === 'owner' ? 'Make one here' : null}
            SecondaryPrompt = {role === 'participant' ? 'Let the owners or admins know that you want a challenge!': undefined}
            navigateToPage="AddChallenge"
            defaultView={true}
            fromLeague={true}
            id = {props.route.params.leagueData._id}
            props = {props}
          />
          }
          </View>
        </View>
      }

      {isMembers === 2 &&
        <View style = {LeagueStyles.MembersChallengesContainer}>
          {countLeaderboard > 0 ?
            <LeagueLeaderboard
              progressInfo = {leaderboardInfo}
            />
          :
          <ZeroItem
            promptText='No Leaderboard Yet'
            SecondaryPrompt = 'Tell the members to start completing challenges!'
          />
          }
       </View>
      }

    </View>
  )
}

export default LeagueDetails;