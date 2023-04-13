import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

function Challenge(props): JSX.Element {
  return (
    <View>
      <Button
        title = "challenge"
        onPress = {() =>
          props.navigation.navigate('Login')
        }
      />
    </View>
  )
}

export default Challenge;
