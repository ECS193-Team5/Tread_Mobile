import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

function Login(props): JSX.Element {
  return (
    <View>
      <Button
        style = {styles.button}
        title = "login"
        onPress = {() =>
          props.navigation.navigate('Signup')
        }
      />      
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
