import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image
} from 'react-native';

import {styles} from "../css/login/Style"
import NavBar from '../components/NavBar/NavBar';
function ChallengesPage(props): JSX.Element {
  return (
    <View style = {styles.container}>
      <Button 
        title = "challenge"
        onPress = {() =>
          props.navigation.navigate('Login')
        }
      />
    </View>
  )
}

export default ChallengesPage;
