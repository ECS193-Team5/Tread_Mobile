import React from 'react';
import {
  View,
  Button
} from 'react-native';
 
function Signup(props): JSX.Element {
  return (
    <View>
      <Button
        title = "challenge"
        onPress = {() =>
          props.navigation.navigate('Challenge')
        }
      />      
    </View>
  )
}

export default Signup;