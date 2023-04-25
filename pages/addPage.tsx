import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import {styles} from '../css/add/home/Style'
import AddButton from '../components/add/addButton';

function AddPage(props): JSX.Element {
	onPress = function () {
		console.log('pressed')
	}

  return (
    <View style = {styles.HomePage}>
    	<View style = {styles.TopButtonContainer}>
    	</View>

    	<View style = {styles.Separator}>
    	</View>

    	<View style = {styles.MiddleButtonContainer}>
    	</View>

    	<View style = {styles.Separator}>
    	</View>

    	<View style = {styles.BottomButtonContainer}>
    	</View>

    </View>
  )
}

export default AddPage;
