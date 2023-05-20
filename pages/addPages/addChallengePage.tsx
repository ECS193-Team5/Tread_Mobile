import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  Keyboard
} from 'react-native';

import {styles} from '../../css/add/challenge/Style';
import SwitchSelector from "react-native-switch-selector";
import IssueChallenge from "../../components/add/issueChallenge";
import ProgressChallenge from "../../components/add/progressChallenge";
import GestureRecognizer from 'react-native-swipe-gestures';
function AddChallengePage(props): JSX.Element {

  const switchOptions = [
    {label: 'Issue', value: 'issue'},
    {label: 'Log', value: 'progress'}
  ];

  const [pageType, setPageType] = useState(!props.route.params.defaultView ? "progress" : "issue");
  const [defaultTab, setDefaultTab] = useState(!props.route.params.defaultView)
  
  const [fromLeague, setFromLeague] = useState(props.route.params.fromLeague)

  return (
    <GestureRecognizer
      onSwipeDown = {() => Keyboard.dismiss()}
      style = {styles.Background}
    >
      <View style = {styles.ToggleContainer}>
        <SwitchSelector
            options = {switchOptions}
            initial = {defaultTab ? 1 : 0}
            selectedColor = '#F9A800'
            textColor = '#014421'
            buttonColor = '#014421'
            onPress = {setPageType}
            hasPadding = {true}
        >
        </SwitchSelector>
      </View>
      {pageType === 'issue' ? 
        <IssueChallenge fromLeague = {fromLeague} id = {props.route.params.id}/>
        :
        <ProgressChallenge/>
      }
      <View style = {styles.BottomSeparator}>

      </View>

    </GestureRecognizer>
  )
}

export default AddChallengePage;
