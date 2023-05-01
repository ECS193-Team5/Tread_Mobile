import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList
} from 'react-native';
import { Text } from 'react-native-elements';
import IncomingSwap from '../components/shared/IncomingSwap';

import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import {styles} from "../css/challenges/Style"
import {cardStyles} from "../css/cards/Style"
import ChallengeCard from '../components/Challenges/ChallengeCard';
import ChallengeScroll from '../components/shared/ChallengeScroll';

// one backend call here to get all challenges //accepted challenges
// pass data to each challenge card with ID
const getChallengeData = function(){
  return (
    [
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
            "exerciseName": "Bowling",
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
                "exerciseName": "Bowling",
                "unit": "ct",
                "amount": 444,
                "_id": "642f81a350e4b483053a9cc9",
                "unitType": "count",
                "convertedAmount": 444
            },
            "progress": 286,
            "completed": false
        }
      },
    ]
  )
}


function ChallengesPage(props): JSX.Element {
  const [titleName, setTitleName] = useState("Current")
  const [availableCount, setAvailableCount] = useState(10)
  const [isCurrent, setIsCurrent] = useState(false)
  const [challengeImage, setChallengeImage] = useState("https://imgur.com/2BHAmsN.png")
  const [ChallengeData, setChallengeData] = useState(getChallengeData)

  const renderChallenge = ({item}) => {
    return (
    <ChallengeCard 
      ChallengeData = {item}
      isWeekly = {isCurrent}/>
    )
  }
  const handleOnPressSwap = function(){
    setIsCurrent(!isCurrent)
    if (isCurrent === false) {
      setTitleName("Weekly")
      setAvailableCount(7)
      // challenges should be set to weekly
      setChallengeImage("https://imgur.com/j33n2DQ.png") 
    } else {
      setTitleName("Current")
      setAvailableCount(10) 
      // challenges should be set to current
      setChallengeImage("https://imgur.com/2BHAmsN.png") 
    }
  }
  
  // Check for invitations and update icon, but for now
  var IncomingImageUrl = "https://imgur.com/ULlEPhH.png"
  
  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Incoming Challenges"}
          imageUrl = {IncomingImageUrl}/>
      </View>
      
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>Challenges</Text>
      </View>

      <View style = {[styles.tabswitchContainer, cardStyles.shadowProp]}>
        <ChallengesSwap
          onPress = {handleOnPressSwap}
          text = {titleName}
          available = {availableCount}
          imageURL = {challengeImage}
        />
      </View>
      
      <View style = {styles.seperator}/>

      <View style = {styles.ChallengesContainer}>
        <ChallengeScroll
          ChallengeData={ChallengeData}
          isCurrent = {isCurrent}
        />
      </View> 

    </View>
  )
}

export default ChallengesPage;
