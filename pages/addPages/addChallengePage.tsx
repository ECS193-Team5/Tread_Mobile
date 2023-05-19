import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image
} from 'react-native';

import {styles} from '../../css/add/challenge/Style';
import SwitchSelector from "react-native-switch-selector";
import IssueChallenge from "../../components/add/issueChallenge";
import ProgressChallenge from "../../components/add/progressChallenge";
function AddChallengePage(props): JSX.Element {

  const switchOptions = [
    {label: 'Issue', value: 'issue'},
    {label: 'Log', value: 'progress'}
  ];

  const [pageType, setPageType] = useState("issue");
  const [defaultTab, setDefaultTab] = useState(!props.route.params.defaultView)
  const [fromLeague, setFromLeague] = useState(props.route.params.fromLeague)

  const getPageContent = function(){
    if(pageType === 'issue') {
      return(<IssueChallenge fromLeague = {fromLeague} id = {props.route.params.id}/>);
    } else {
      return(<ProgressChallenge/>);
    }
  }

  return (
    <View style = {styles.Background}>
      <View style = {styles.ToggleContainer}>
        <SwitchSelector
            options = {switchOptions}
            initial = {defaultTab ? 1 : 0}
            selectedColor = 'white'
            textColor = '#014421'
            buttonColor = '#014421'
            onPress = {setPageType}
            hasPadding = {true}
        >
        </SwitchSelector>
      </View>
        {getPageContent()}
      <View style = {styles.BottomSeparator}>

      </View>

    </View>
  )
}

export default AddChallengePage;
