import React, { useEffect, useState } from 'react';
import {
    Pressable,
    Image,
    View,
    Text,
    Alert
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import {styles} from "../../css/challenges/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import { SharedStyles } from '../../css/shared/Style';

// import {showMessage} from 'react-native-flash-message'
// import {GestureHandlerRootView,Swipeable} from 'react-native-gesture-handler';

import axios from 'axios';
import {BACKEND_URL} from '@env';

function UserCard({UserInfo , Blocked, Friends, index, handler, UserRole, props, image, onRefresh}) {

    const [SenderOrReceiver , setSenderOrReceiver] = useState("To")
    const [cardRole, setCardRole] = useState('')
    const [currentUser, setCurrentUser] = useState("aaa")

    const getUserInfo = function(){
        return (
            <View style = {[cardStyles.ChallengeNameContainer, {flexDirection : 'column'}]}>
                {UserRole === 'Mutual' ?
                    null
                    :
                    <Text style = {cardStyles.ChallengeNameText}>
                        {'display name'}
                    </Text>
                }
                <Text style = {[cardStyles.ChallengeNameText, {color : "#F9A800"}]}>
                    {'username'}
                </Text>
            </View>
        )
    }

    const UserInfoOrRecipientInfo = function(){
        if (UserRole === 'Sent' || UserRole === 'Received'){
            return (
                <View style = {[cardStyles.ChallengeNameContainer, {flexDirection : 'column', flex : 40}]}>
                    <Text style = {cardStyles.ChallengeNameText}>
                        {SenderOrReceiver + " : "}
                    </Text>
                </View>
            )
        } else {
            return getUserInfo()
        }
    }

    const isRoleInLeague = function(){
        if(UserRole === 'All Friends' || UserRole === 'Blocked Users'){
            return null
        } else if(UserRole === 'Sent' || UserRole === 'Received'){
            return getUserInfo()
        } else if (UserRole === 'Mutual'){
            return (
                <View style = {[cardStyles.ChallengeNameContainer, {alignItems : 'center'}]}>
                    <Text style = {cardStyles.ChallengeNameText}>
                        {UserInfo.mutuals + (UserInfo.mutuals === 1 ? ' Mutual Friend' : ' Mutual Friends')}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style = {[cardStyles.ChallengeNameContainer, {alignItems : 'center'}]}>
                    <Text style = {cardStyles.ChallengeNameText}>
                        {cardRole !== 'participant' ? cardRole.charAt(0).toUpperCase() + cardRole.slice(1) : null}
                    </Text>
                </View>
            )
        }
    }

    return(
        <View style= {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp, currentUser === currentUser ? {borderColor : '#014421', borderWidth : 2} : null]}>
            <View style = {cardStyles.ImageContainer}>
                <Image style ={ImageStyles.single} source={{uri: image}}/>
            </View>

            <View style = {cardStyles.seperator}/>

            <View style = {cardStyles.ChallengeCardTextContainer}>
                {UserInfoOrRecipientInfo()}
                {isRoleInLeague()}
            </View>
        </View>
    )
}

export default UserCard