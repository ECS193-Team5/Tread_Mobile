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

import {styles} from '../css/add/friend/Style';
import { SharedStyles } from '../css/shared/Style';
import Invite from "../testComps/shared/invite";
import UserScroll from "../testComps/shared/UserScroll";
import ZeroItem from "../testComps/shared/ZeroItem";

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

    const [count, setCount] = useState(0);

    return (
        <View
            style = {[styles.Background, {paddingTop:(Platform.OS === 'ios') ? "12%" : 0}]}
        >

            <View
                style = {{flex : 32}}
            >
                <Invite
                    text = 'Add Friend'
                />
            </View>

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
                        <ZeroItem/>
                    }
                </View>
            </View>
        </View>
    )
}

export default AddFriendPage;
