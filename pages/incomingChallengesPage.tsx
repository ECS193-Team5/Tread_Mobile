import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import {styles} from "../css/login/Style"

function IncomingChallengesPage(props): JSX.Element {
  return (
    <View style = {styles.container}>
      <Button 
        title = "Incoming Challenges"
        onPress = {() =>
          props.navigation.navigate('Challenges')
        }
      />
    </View>
  )
}

export default IncomingChallengesPage;
