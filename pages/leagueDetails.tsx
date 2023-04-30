import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image
} from 'react-native';

import SwitchSelector from "react-native-switch-selector"
import {styles} from "../css/challenges/Style"
import { LeagueStyles} from '../css/leagues/Style';
import {cardStyles} from "../css/cards/Style"
import IncomingSwap from '../components/shared/IncomingSwap';
import { ImageStyles } from '../css/imageCluster/Style';
import ChallengeScroll from '../components/shared/ChallengeScroll';
import LeagueMemberView from '../components/Leagues/LeagueMemberView';

function LeagueDetails(props): JSX.Element {
  var imageUrl = "https://imgur.com/nFRNXOB.png"  

  var LeagueImage = 'https://imgur.com/N31G5Sk.png'
  
  const options = [
    { label : "Members" , value : true},
    { label : "Challenges", value : false}
  ]

  const [isMembers, setIsMembers] = useState("Members")
  
  const LeagueMembers = 
  [
    {
        "username": "User#6822",
        "displayName": "Rebekah Grace",
        "role": "owner"
    },
    {
        "username": "yadda#7651",
        "displayName": "yadda",
        "role": "admin"
    },
    {
        "username": "Kauboy#8925",
        "displayName": "Kaushik",
        "role": "participant"
    },
    {
      "username": "Test#1234",
      "displayName": "Tester1",
      "role": "participant"
    },
    {
      "username": "Test2#1234",
      "displayName": "Tester 2",
      "role": "participant"
    }
]
  
  
  const ChallengeData = [
    {
      "_id": "642f81a350e4b483053a9cc1",
      "participants": [
          "batman#9320",
          "batman#6380",
          "Kauboy#8925",
          "PrabTheCrab#1609"
      ],
      "sentUser": "batman#6380",
      "receivedUser": "63fb66a1971b753d7edf9c48",
      "challengeType": "league",
      "issueDate": "2023-04-07T00:00:00.000Z",
      "dueDate": "2023-04-10T00:00:00.000Z",
      "exercise": {
          "exerciseName": "Aikido",
          "unit": "ct",
          "amount": 444,
          "_id": "642f81a350e4b483053a9cc2",
          "unitType": "count",
          "convertedAmount": 444
      },
      "status": "accepted",
      "__v": 0,
      "progress": {
          "_id": "642f81a350e4b483053a9cc8",
          "username": "Kauboy#8925",
          "challengeID": "642f81a350e4b483053a9cc1",
          "issueDate": "2023-04-07T00:00:00.000Z",
          "dueDate": "2023-04-10T00:00:00.000Z",
          "exercise": {
              "exerciseName": "Aikido",
              "unit": "ct",
              "amount": 444,
              "_id": "642f81a350e4b483053a9cc9",
              "unitType": "count",
              "convertedAmount": 444
          },
          "progress": 111,
          "completed": false
      }
    },
    {
      "_id": "642f81a350e4b483053a9cc1",
      "participants": [
          "batman#9320",
          "batman#6380",
          "Kauboy#8925",
          "PrabTheCrab#1609"
      ],
      "sentUser": "batman#6380",
      "receivedUser": "63fb66a1971b753d7edf9c48",
      "challengeType": "league",
      "issueDate": "2023-04-07T00:00:00.000Z",
      "dueDate": "2023-04-10T00:00:00.000Z",
      "exercise": {
          "exerciseName": "Badminton",
          "unit": "ct",
          "amount": 444,
          "_id": "642f81a350e4b483053a9cc2",
          "unitType": "count",
          "convertedAmount": 444
      },
      "status": "accepted",
      "__v": 0,
      "progress": {
          "_id": "642f81a350e4b483053a9cc8",
          "username": "Kauboy#8925",
          "challengeID": "642f81a350e4b483053a9cc1",
          "issueDate": "2023-04-07T00:00:00.000Z",
          "dueDate": "2023-04-10T00:00:00.000Z",
          "exercise": {
              "exerciseName": "Badminton",
              "unit": "ct",
              "amount": 444,
              "_id": "642f81a350e4b483053a9cc9",
              "unitType": "count",
              "convertedAmount": 444
          },
          "progress": 222,
          "completed": false
      }
    },
    {
      "_id": "642f81a350e4b483053a9cc1",
      "participants": [
          "batman#9320",
          "batman#6380",
          "Kauboy#8925",
          "PrabTheCrab#1609"
      ],
      "sentUser": "batman#6380",
      "receivedUser": "63fb66a1971b753d7edf9c48",
      "challengeType": "league",
      "issueDate": "2023-04-07T00:00:00.000Z",
      "dueDate": "2023-04-10T00:00:00.000Z",
      "exercise": {
          "exerciseName": "Basketball",
          "unit": "ct",
          "amount": 444,
          "_id": "642f81a350e4b483053a9cc2",
          "unitType": "count",
          "convertedAmount": 444
      },
      "status": "accepted",
      "__v": 0,
      "progress": {
          "_id": "642f81a350e4b483053a9cc8",
          "username": "Kauboy#8925",
          "challengeID": "642f81a350e4b483053a9cc1",
          "issueDate": "2023-04-07T00:00:00.000Z",
          "dueDate": "2023-04-10T00:00:00.000Z",
          "exercise": {
              "exerciseName": "Basketball",
              "unit": "ct",
              "amount": 444,
              "_id": "642f81a350e4b483053a9cc9",
              "unitType": "count",
              "convertedAmount": 444
          },
          "progress": 555,
          "completed": false
      }
    },
    {
      "_id": "642f81a350e4b483053a9cc1",
      "participants": [
          "batman#9320",
          "batman#6380",
          "Kauboy#8925",
          "PrabTheCrab#1609"
      ],
      "sentUser": "batman#6380",
      "receivedUser": "63fb66a1971b753d7edf9c48",
      "challengeType": "league",
      "issueDate": "2023-04-07T00:00:00.000Z",
      "dueDate": "2023-04-10T00:00:00.000Z",
      "exercise": {
          "exerciseName": "Archery",
          "unit": "ct",
          "amount": 444,
          "_id": "642f81a350e4b483053a9cc2",
          "unitType": "count",
          "convertedAmount": 444
      },
      "status": "accepted",
      "__v": 0,
      "progress": {
          "_id": "642f81a350e4b483053a9cc8",
          "username": "Kauboy#8925",
          "challengeID": "642f81a350e4b483053a9cc1",
          "issueDate": "2023-04-07T00:00:00.000Z",
          "dueDate": "2023-04-10T00:00:00.000Z",
          "exercise": {
              "exerciseName": "Archery",
              "unit": "ct",
              "amount": 444,
              "_id": "642f81a350e4b483053a9cc9",
              "unitType": "count",
              "convertedAmount": 444
          },
          "progress": 179,
          "completed": false
      }
    }
  ]
  
  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Leagues"}
          imageUrl = {imageUrl}/>
      </View>

      <View style = {LeagueStyles.LeagueInfoCardContainer}>
        <View style = {[LeagueStyles.LeagueInfoCard, cardStyles.shadowProp]}>
          <View style = {LeagueStyles.LeagueNameContainer}> 
            <Text style = {styles.TitleText}>{props.route.params.leagueData.leagueName}</Text>
          </View>
        
          <View style = {LeagueStyles.LeagueImageContainer}>
            <Image style ={ImageStyles.LeagueImage} source={{uri: LeagueImage}}/>
          </View>

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
        </View>
      </View>

      <View style = {styles.seperator}/>

      {isMembers ? 
        <LeagueMemberView
          MemberData={LeagueMembers}
        /> 
      : 
      <View style = {LeagueStyles.MembersChallengesContainer}>
        <ChallengeScroll
          ChallengeData={ChallengeData}
          isCurrent = {false}
        />
      </View>
      } 
    </View>
  )
}

export default LeagueDetails;