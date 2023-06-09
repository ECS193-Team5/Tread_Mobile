import React, { useState } from 'react';
import {
    Pressable,
    Image,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import { ImageStyles } from '../../css/imageCluster/Style';

function LeagueCard({LeagueData, props, refresh, handleLeaguePress}) {
    var image = ""

    return (
        <Pressable
            onPress={handleLeaguePress}
            style = {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}
            testID="league"
        >
            <StatusBar
                barStyle="dark-content"
            />

            <View style = {cardStyles.ImageContainer}>
                <Image style ={ImageStyles.single} source={{uri: image}}/>
            </View>

            <View style = {cardStyles.seperator}/>

            <View style = {cardStyles.ChallengeCardTextContainer}>
                <View style = {cardStyles.LeagueDetailContainer}>
                    <Text style = {cardStyles.LeagueNameText}>
                        {"League Name"}
                    </Text>
                    <Text style = {cardStyles.ChallengeNameText}>
                        {"Member"}
                    </Text>
                    <Text style = {[cardStyles.ChallengeNameText , {color : "#F9A800"}]}>
                        {"Active Challenges"}
                    </Text>
                </View>
            </View>
            <View style = {cardStyles.ChallengeOpenImageContainer}>
                <Image style ={{width : 15, height : 15, alignSelf: 'center'}}
                       source={{uri: 'https://i.imgur.com/aNoUoZK.png' }}/>
            </View>
        </Pressable>
    )
}

export default LeagueCard;