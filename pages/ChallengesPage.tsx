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

import ChallengesSwap from '../components/shared/ChallengeSwap';
import {styles} from "../css/challenges/Style"
import {cardStyles} from "../css/cards/Style"
import ChallengeCard from '../components/shared/ChallengeCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const renderChallenge = ({item}) => {
  return (
  // <Text style = {styles.TitleText}>Current Challenges</Text>
  <ChallengeCard text = {item}/>
  )
}

function ChallengesPage(props): JSX.Element {
  const [titleName, setTitleName] = useState("Current Challenges")
  const [availableCount, setAvailableCount] = useState(10)
  const [isCurrent, setIsCurrent] = useState(false)
  const [challengeImage, setChallengeImage] = useState("https://imgur.com/2BHAmsN.png")



  const handleOnPressSwap = function(){
    setIsCurrent(!isCurrent)
    if (isCurrent === false) {
      setTitleName("Weekly Challenges")
      setAvailableCount(7)
      setChallengeImage("https://imgur.com/j33n2DQ.png") 
    } else {
      setTitleName("Current Challenges")
      setAvailableCount(10) 
      setChallengeImage("https://imgur.com/2BHAmsN.png") 
    }
  }
  
  // Check for invitations and update icon, but for now
  var imageUrl = "https://imgur.com/ULlEPhH.png"

  const ChallengeData = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Incoming Challenges"}
          imageUrl = {imageUrl}/>
      </View>
      
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>{titleName}</Text>
      </View>

      <View style = {[styles.tabswitchContainer, cardStyles.shadowProp]}>
        <ChallengesSwap
          onPress = {handleOnPressSwap}
          text = {titleName.split(' ')[0]}
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
