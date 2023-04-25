import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList
} from 'react-native';

import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import {styles} from "../css/challenges/Style"
import {cardStyles} from "../css/cards/Style"
import IncomingSwap from '../components/shared/IncomingSwap';
import SelectDropdown from 'react-native-select-dropdown';
import { SharedStyles } from '../css/shared/Style';
import LeagueInviteCard from '../components/shared/LeagueInviteCard';

const FilterOptions = ['Received' , 'Sent']

function getLeagueData() { 
  return(
  [{
      "_id": "63fb66a1971b753d7edf9c48",
      "leagueName": "justice!!!",
      "members": [
          "batman#9320",
          "batman#6380",
          "Kauboy#8925"
      ],
      "activeChallenges": 0
  },
  {
      "_id": "63fb66da1fae291d973d7c40",
      "leagueName": "justice",
      "members": [
          "batman#9320",
          "Kauboy#8925"
      ],
      "activeChallenges": 0
  },
  {
      "_id": "64045a072af2c4cfc40cc99c",
      "leagueName": "justice",
      "members": [
          "batman#6380",
          "batman#0000",
          "Kauboy#8925"
      ],
      "activeChallenges": 0
  },
  {
      "_id": "6406f00bbe693def705ac294",
      "leagueName": "Pub Raindrops",
      "members": [
          "Kauboy#8925"
      ],
      "activeChallenges": 1
  },
  {
      "_id": "6406f021be693def705ac2b2",
      "leagueName": "Priv Raindrops",
      "members": [
          "Kauboy#8925"
      ],
      "activeChallenges": 0
  },
  {
      "_id": "64089b27a018868213200d7a",
      "leagueName": "Pokemon League",
      "members": [
          "User#6822",
          "yadda#7651",
          "Kauboy#8925"
      ],
      "activeChallenges": 0
  }]
)}

function IncomingLeaguesPage(props): JSX.Element {
  const [LeagueData, setLeagueData] = useState(getLeagueData)
  const [pageTitle, setPageTitle] = useState('Sent')
  var imageUrl = "https://imgur.com/nFRNXOB.png"  
  
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

  const getdropdownIcon = function(){
    return (
    <Image style = {{width : 10, height : 10}}source={{uri: "https://imgur.com/ybSDJeh.png"}}/>
    )
  }
  
  const handleDropDown = function(selectedItem){
    console.log(selectedItem)
    setPageTitle(selectedItem)
    // set challenges array here
  }
  
  const deleteItem = function(lData) {    
    console.log(lData._id)
    console.log("deleted")
    const filteredData = LeagueData.filter(item => item._id !== lData._id);
    setLeagueData(filteredData)
    LayoutAnimation.configureNext(layoutAnimConfig) 
  }

  const renderInvite = ({item, index}) => {
    return (
    <LeagueInviteCard
      LeagueData= {item}
      index = {index}
      handler = {deleteItem}
      pageTitle = {pageTitle}
      />
    )
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Leagues"}
          imageUrl = {imageUrl}/>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>{pageTitle} Invitations</Text>
      </View>
      <View style = {styles.filterContainer}>
        <SelectDropdown
          data={FilterOptions}
          defaultValue = "Sent"
          renderDropdownIcon={getdropdownIcon}
          dropdownIconPosition='right'
          buttonStyle = {SharedStyles.dropDownButton}
          buttonTextStyle = {SharedStyles.dropDownText}
          dropdownStyle = {SharedStyles.dropDownBox}
          selectedRowStyle = {SharedStyles.selectedrowStyle}
          rowTextStyle = {SharedStyles.rowTextStyle}
          onSelect = {(selectedItem) => {handleDropDown(selectedItem)}}
        />
      </View>
      <View style = {styles.ChallengesContainer}>
        <FlatList
          data = {LeagueData}
          renderItem = {renderInvite}
        />
      </View>
    </View>
  )
}

export default IncomingLeaguesPage;