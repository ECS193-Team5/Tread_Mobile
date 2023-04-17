import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import {styles} from "../css/login/Style"

function ProfilePage(props): JSX.Element {
  return (
    <View style = {styles.container}>
      <Button 
        title = "profile page"
        onPress = {() =>
          props.navigation.navigate('Login')
        }
      />
    </View>
  )
}

export default ProfilePage;
