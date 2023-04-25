import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  FlatList
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import LeagueCard from '../components/Leagues/LeagueCard';

import IncomingSwap from '../components/shared/IncomingSwap';
import { cardStyles } from '../css/cards/Style';
import {styles} from "../css/challenges/Style"
import { SharedStyles } from '../css/shared/Style';

const FilterOptions = ['All' , 'Admin']

function LeaguesPage(props): JSX.Element {
  // Check for invitations and update icon, but for now
  var IncomingImageUrl = "https://imgur.com/ULlEPhH.png"

  const getdropdownIcon = function(){
    return (
    <Image style = {{width : 10, height : 10}}source={{uri: "https://imgur.com/ybSDJeh.png"}}/>
    )
  }
  
  const handleDropDown = function(selectedItem){
    console.log(selectedItem)
    // set challenges array here
  }

  const LeagueData = [
    {
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
    },
    {
        "_id": "640948591e9cf205836e69e9",
        "leagueName": " -",
        "members": [
            "Kauboy#8925"
        ],
        "activeChallenges": 0
    },
    {
        "_id": "640948691e9cf205836e6a00",
        "leagueName": "/",
        "members": [
            "Kauboy#8925"
        ],
        "activeChallenges": 0
    }
  ]

  const renderLeague = ({item}) => {
    return (
    <LeagueCard 
      LeagueData = {item}
      props = {props}
    />
    )
  }

  return (
    <View style = {styles.container}>
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
        <SelectDropdown
          data={FilterOptions}
          defaultValue = "All"
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
          renderItem = {renderLeague}
          contentContainerStyle = {styles.FlatListContainer}
        />
      </View> 

    </View>
  )
}

export default LeaguesPage;
