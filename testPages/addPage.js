import React from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';

import {styles} from '../css/add/home/Style'
import AddButton from "../testComps/add/addButton";

function AddPage(props) {

    return (
        <View style = {styles.HomePage}>
            <View style = {styles.Separator}>
            </View>

            <View style = {styles.ButtonContainer}>

                <AddButton
                    title = 'Challenge'
                    description = 'Send Challenge or Log Activity'
                    onPress = {props.onAddChallengePress}
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
                    description = 'Add a Friend'
                    onPress = {props.onAddFriendPress}
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
                    description = 'Create or Join League'
                    onPress = {props.onAddLeaguePress}
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
