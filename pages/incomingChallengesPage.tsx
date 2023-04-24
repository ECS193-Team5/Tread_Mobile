import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  FlatList
} from 'react-native';

import {styles} from "../css/challenges/Style"
import { SharedStyles } from '../css/shared/Style';

import IncomingSwap from '../components/shared/IncomingSwap';
import SelectDropdown from 'react-native-select-dropdown'
import ChallengeInviteCard from '../components/shared/ChallengeInviteCard';

const FilterOptions = ['Received' , 'Sent']

const ChallengeData = [
  {
    "_id": "6446529ba46596242ddd9488",
    "participants": [
        "Kauboy#8925",
        "Kauboy#5085"
    ],
    "sentUser": "Kauboy#8925",
    "receivedUser": "Kauboy#5085",
    "challengeType": "friend",
    "issueDate": "2023-04-24T00:00:00.000Z",
    "dueDate": "2023-04-27T00:00:00.000Z",
    "exercise": {
        "exerciseName": "Archery",
        "unit": "ct",
        "amount": 1,
        "_id": "6446529ba46596242ddd9489",
        "unitType": "count",
        "convertedAmount": 1
    },
    "status": "pending",
    "__v": 0
  },
  {
    "_id": "6446529ba46596242ddd9488",
    "participants": [
        "Kauboy#8925",
        "Kauboy#5085"
    ],
    "sentUser": "Kauboy#8925",
    "receivedUser": "Kauboy#5085",
    "challengeType": "friend",
    "issueDate": "2023-04-24T00:00:00.000Z",
    "dueDate": "2023-04-27T00:00:00.000Z",
    "exercise": {
        "exerciseName": "Chess",
        "unit": "ct",
        "amount": 1,
        "_id": "6446529ba46596242ddd9489",
        "unitType": "count",
        "convertedAmount": 1
    },
    "status": "pending",
    "__v": 0
  },
  {
    "_id": "6446529ba46596242ddd9488",
    "participants": [
        "Kauboy#8925",
        "Kauboy#5085"
    ],
    "sentUser": "Kauboy#8925",
    "receivedUser": "Kauboy#5085",
    "challengeType": "friend",
    "issueDate": "2023-04-24T00:00:00.000Z",
    "dueDate": "2023-04-27T00:00:00.000Z",
    "exercise": {
        "exerciseName": "Basketball",
        "unit": "ct",
        "amount": 1,
        "_id": "6446529ba46596242ddd9489",
        "unitType": "count",
        "convertedAmount": 1
    },
    "status": "pending",
    "__v": 0
  },
  {
    "_id": "6446529ba46596242ddd9488",
    "participants": [
        "Kauboy#8925",
        "Kauboy#5085"
    ],
    "sentUser": "Kauboy#8925",
    "receivedUser": "Kauboy#5085",
    "challengeType": "friend",
    "issueDate": "2023-04-24T00:00:00.000Z",
    "dueDate": "2023-04-27T00:00:00.000Z",
    "exercise": {
        "exerciseName": "Archery",
        "unit": "ct",
        "amount": 1,
        "_id": "6446529ba46596242ddd9489",
        "unitType": "count",
        "convertedAmount": 1
    },
    "status": "pending",
    "__v": 0
  },
  {
    "_id": "6446529ba46596242ddd9488",
    "participants": [
        "Kauboy#8925",
        "Kauboy#5085"
    ],
    "sentUser": "Kauboy#8925",
    "receivedUser": "Kauboy#5085",
    "challengeType": "friend",
    "issueDate": "2023-04-24T00:00:00.000Z",
    "dueDate": "2023-04-27T00:00:00.000Z",
    "exercise": {
        "exerciseName": "Chess",
        "unit": "ct",
        "amount": 1,
        "_id": "6446529ba46596242ddd9489",
        "unitType": "count",
        "convertedAmount": 1
    },
    "status": "pending",
    "__v": 0
  },
  {
    "_id": "6446529ba46596242ddd9488",
    "participants": [
        "Kauboy#8925",
        "Kauboy#5085"
    ],
    "sentUser": "Kauboy#8925",
    "receivedUser": "Kauboy#5085",
    "challengeType": "friend",
    "issueDate": "2023-04-24T00:00:00.000Z",
    "dueDate": "2023-04-27T00:00:00.000Z",
    "exercise": {
        "exerciseName": "Basketball",
        "unit": "ct",
        "amount": 1,
        "_id": "6446529ba46596242ddd9489",
        "unitType": "count",
        "convertedAmount": 1
    },
    "status": "pending",
    "__v": 0
  }
]


function IncomingChallengesPage(props): JSX.Element {
  var NavImageUrl = "https://imgur.com/nFRNXOB.png"  
  const [pageTitle, setPageTitle] = useState('Received')
  
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

  const renderInvite = ({item}) => {
    return (
    <ChallengeInviteCard
      ChallengeData = {item}
      pageTitle = {pageTitle}
      />
    )
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Challenges"}
          imageUrl = {NavImageUrl}/>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>{pageTitle} Challenges</Text>
      </View>
      <View style = {styles.filterContainer}>
        {/* <Text style = {styles.FilterText}>Filters</Text> */}
        <SelectDropdown
          data={FilterOptions}
          defaultValue = "Received"
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
          data = {ChallengeData}
          renderItem = {renderInvite}
          contentContainerStyle = {styles.FlatListContainer}
        />
      </View>

    </View>
  )
}

export default IncomingChallengesPage;
