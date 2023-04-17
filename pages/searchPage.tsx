import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import {styles} from "../css/login/Style"

function SearchPage(props): JSX.Element {
  return (
    <View style = {styles.container}>
      <Button 
        title = "search page"
        onPress = {() =>
          props.navigation.navigate('Login')
        }
      />
    </View>
  )
}

export default SearchPage;
