import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';
import ButtonForClicking from './healthkit';
import {styles} from "../css/login/Style"

function LeaguesPage(props): JSX.Element {
  return (
    <View style = {styles.container}>
      <Button 
        title = "leagues"
        onPress = {() =>
          props.navigation.navigate('Login')
        }
      />
      <ButtonForClicking/>
    </View>
  )
}

export default LeaguesPage;
