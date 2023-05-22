import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl
} from 'react-native';

import LeagueCard from '../components/Leagues/LeagueCard';

import SwitchSelector from "react-native-switch-selector"
import IncomingSwap from '../components/shared/IncomingSwap';
import {styles} from "../css/challenges/Style"
import axios from 'axios';
import {BACKEND_URL} from '@env';
import ZeroItem from '../components/shared/ZeroItem';
import { useFocusEffect } from '@react-navigation/native';

const options = [
  { label : "All" , value : 'All'},
  { label : "Admin", value : 'Admin'},
]

function LeaguesPage(props): JSX.Element {
  const getAllLeagueData = function() {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_leagues',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setLeagueData(response.data)
        setCount(response.data.length)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const getAdminLeagueData = function() {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_admin_leagues_with_challenge_count',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setLeagueData(response.data)
        setCount(response.data.length)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const getReceived = function() {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_invited_leagues',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        if (response.data.length > 0){
          setImage('https://imgur.com/gMqz2UZ.png')
        } else {
          setImage('https://imgur.com/ULlEPhH.png')
        }     
      })
      .catch((error) =>
        console.log(error)
      )
  }


  const [IncomingImageUrl, setImage] = useState(getReceived)
  const [count, setCount] = useState(0)
  const [LeagueData, setLeagueData] = useState(getAllLeagueData)
  const [refreshing, setRefreshing] = useState(false)
  const [currentView, setCurrentView] = useState("All")

  const handleDropDown = function(selectedItem){
    console.log(selectedItem)
    setCurrentView(selectedItem)
    setLeagueData()
    if(selectedItem === 'All'){
      getAllLeagueData()
    } else {
      getAdminLeagueData()
    }
  }
  
  useFocusEffect(
    React.useCallback(() => {
      if(currentView === 'All'){
        getAllLeagueData()
      } else {
        getAdminLeagueData()
      }
      getReceived()
    }, [currentView])
  );

  const handleRefresh = function(){
    if(currentView === 'All'){
      getAllLeagueData()
    } else {
      getAdminLeagueData()
    }
  }

  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      handleRefresh()
      setRefreshing(false);
      }, 450);
  }

  const renderLeague = ({item}) => {
    return (
    <LeagueCard 
      LeagueData = {item}
      props = {props}
      refresh = {handleRefresh}
    />
    )
  }

  return (
    <View  style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Incoming Leagues"}
          imageUrl = {IncomingImageUrl}/>
      </View>

      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>Your Leagues</Text>
      </View>
      <View style = {styles.filterContainer}>
        <SwitchSelector
          initial= {0}
          onPress = {value => handleDropDown(value)}
          textColor = {'#014421'}
          selectedColor = {'#F9A800'}
          buttonColor = {'#014421'}
          hasPadding
          options = {options}
        />
      </View>
      <View style = {styles.ChallengesContainer}>
        {count > 0 ? 
          <FlatList
            data = {LeagueData}
            renderItem = {renderLeague}
            contentContainerStyle = {styles.FlatListContainer}
            refreshControl ={
              <RefreshControl 
                refreshing = {refreshing} 
                onRefresh = {Refresh} 
                colors = {['#014421']}
                tintColor = {'#014421'}
                progressViewOffset = {-10}
              />
            }
          />
         :
          <ZeroItem 
              promptText={'You ' + (currentView === 'All' ? 'have not joined any' : 'are not an admin for any') + ' Leagues'}
             navigateToText={currentView === 'All' ? 'Join or make one here' :  'Make one here'}
             navigateToPage={'AddLeague'}
             props = {props}
             defaultView = {true}
           />    
        } 
      </View> 

    </View>
  )
}

export default LeaguesPage;