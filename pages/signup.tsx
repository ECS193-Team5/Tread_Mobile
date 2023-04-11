import React from 'react';
import {
  View,
  Button
} from 'react-native';
 
function Signup(props): JSX.Element {
  return (
    <View>
      <Button
        title = "signup"
        onPress = {() =>
          props.navigation.navigate('Login')
        }
      />      
    </View>
  )
}

export default Signup;