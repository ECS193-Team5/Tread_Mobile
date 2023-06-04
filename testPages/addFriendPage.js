import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    Platform,
    UIManager,
    LayoutAnimation,
    Keyboard,
    AppState
} from 'react-native';

import {styles} from '../../css/add/friend/Style';
import { SharedStyles } from '../../css/shared/Style';
import {BACKEND_URL} from '@env';
import Invite from "../testComps/shared/invite";
import axios from 'axios';
import getReccFriend from "../../routes/add/recommend_friend";
import UserScroll from "../testComps/shared/UserScroll";
import ZeroItem from '../../components/shared/ZeroItem';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useFocusEffect } from '@react-navigation/native';

function AddFriendPage(props) {
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    const layoutAnimConfig = {
        duration: 1000,
        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
        },
        delete: {
            duration: 200,
            type: LayoutAnimation.Types.easeOut,
            property: LayoutAnimation.Properties.opacity,
        },
    };

    const deleteItem = function(mData) {
        console.log(mData.username)
        console.log("deleted request")
        const filteredData = mutuals.filter(item => item.username !== mData.username);
        setMutuals(filteredData)
        filteredData.length === 0 ? setCount(0) : null
        LayoutAnimation.configureNext(layoutAnimConfig)
    }

    // const handleRefresh = function(){
    //     getMutualFriends()
    // }

    // const getMutualFriends = function(){
    //     axios(getReccFriend())
    //         .then(function (response) {
    //             // console.log(response.data[0])
    //             var recommendedFriends = []
    //             for (let user of response.data){
    //                 var data = {
    //                     username : user[0],
    //                     mutuals :  user[1]
    //                 }
    //                 recommendedFriends.push(data)
    //             }
    //             console.log(recommendedFriends)
    //             setMutuals(recommendedFriends)
    //             setCount(recommendedFriends.length)
    //         })
    //         .catch((error) => {
    //                 console.log(error);
    //             }
    //         )
    // }

    const [mutuals, setMutuals] = useState([]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getMutualFriends()
    //     }, [])
    // );


    const [count, setCount] = useState(0);

    return (
        <View
            style = {[styles.Background, {paddingTop:(Platform.OS === 'ios') ? "12%" : 0}]}
        >

            <GestureRecognizer
                onSwipeDown = {() => Keyboard.dismiss()}
                style = {{flex : 32}}
            >
                <Invite
                    text = 'Add Friend'
                />
            </GestureRecognizer>

            <View style = {styles.SeparatorContainer}>
                <View style = {SharedStyles.seperator}/>
                <View style = {styles.SuggestedTitleContainer}>
                    <Text style = {styles.Title}>
                        Suggested Friends
                    </Text>
                </View>
                <View style = {styles.SuggestedUserContainer}>
                    {count > 0 ?
                        <UserScroll/>
                        :
                        <ZeroItem
                            promptText={'No recommended friends yet'}
                            navigateToText=""
                            SecondaryPrompt=""
                        />
                    }
                </View>
            </View>
        </View>
    )
}

export default AddFriendPage;
