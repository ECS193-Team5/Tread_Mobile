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




function ChallengesPage(props): JSX.Element {
  const [titleName, setTitleName] = useState("Current")
  const [availableCount, setAvailableCount] = useState(10)
  const [isCurrent, setIsCurrent] = useState(false)
  const [challengeImage, setChallengeImage] = useState("https://imgur.com/2BHAmsN.png")


  const renderChallenge = ({item}) => {
    return (
    <ChallengeCard 
      text = {item}/>
    )
  }
  const handleOnPressSwap = function(){
    setIsCurrent(!isCurrent)
    if (isCurrent === false) {
      setTitleName("Weekly")
      setAvailableCount(7)
      setChallengeImage("https://imgur.com/j33n2DQ.png") 
    } else {
      setTitleName("Current")
      setAvailableCount(10) 
      setChallengeImage("https://imgur.com/2BHAmsN.png") 
    }
  }
  
  // Check for invitations and update icon, but for now
  var imageUrl = "https://imgur.com/ULlEPhH.png"

  // one backend call here to get all challenges //accepted challenges
  // pass data to each challenge card with ID
  const ChallengeData = ['1gasdghsahgafhgasdghjasghjdsfghjfghj','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Incoming Challenges"}
          imageUrl = {imageUrl}/>
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
        <FlatList
          data = {ChallengeData}
          renderItem = {renderChallenge}
          contentContainerStyle = {styles.FlatListContainer}
        />
      </View> 

      
    </View>
  )
}

export default ChallengesPage;
