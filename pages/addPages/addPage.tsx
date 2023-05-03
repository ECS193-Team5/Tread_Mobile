import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import {styles} from '../../css/add/home/Style'
import AddButton from '../../components/add/addButton';

function AddPage(props): JSX.Element {
	onAddChallengePress = function () {
		props.navigation.navigate('AddChallenge')
	}

	onAddFriendPress = function () {
		props.navigation.navigate('AddFriend')
	}

	onAddLeaguePress = function () {
		props.navigation.navigate('AddLeague')
	}

  return (
    <View style = {styles.HomePage}>
    	<View style = {styles.Separator}>
    	</View>

    	<View style = {styles.ButtonContainer}>

    		<AddButton
    			title = 'Challenge'
    			description = 'Issue or Progress challenge'
    			onPress = {onAddChallengePress}
    			imageUrl = 'https://i.imgur.com/ZIgWWQq.png'
    		>
    		</AddButton>
    	</View>

    	<View style = {styles.Separator}>
    		<View style = {styles.SeparatorLine}>
    		</View>
    	</View>

    	<View style = {styles.ButtonContainer}>
    		<AddButton
    			title = 'Friend'
    			description = 'Add a friend'
    			onPress = {onAddFriendPress}
          imageUrl = 'https://i.imgur.com/eD1QEbq.png'
    		>
    		</AddButton>
    	</View>

    	<View style = {styles.Separator}>
    		<View style = {styles.SeparatorLine}>
    		</View>
    	</View>

    	<View style = {styles.ButtonContainer}>
    		<AddButton
    			title = 'League'
    			description = 'Create or Join to league'
    			onPress = {onAddLeaguePress}
    			imageUrl = 'https://i.imgur.com/mvWXcvC.png'
    		>
    		</AddButton>

    	</View>

    	<View style = {styles.Separator}>
    	</View>

    	<View style = {styles.Separator}>
    	</View>

    </View>
  )
}

export default AddPage;
