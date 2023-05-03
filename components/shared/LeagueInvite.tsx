import React, { useState, useEffect} from 'react';
import {
    View,
    Button,
    StyleSheet,
    Text,
    TextInput,
    Pressable
} from 'react-native';

import {styles} from '../../css/add/friend/Style';
import axios from "axios";

function LeagueInvite({text, config}): JSX.Element {
    const [friendID, setFriendID] = useState("");
    const [validID, setValidID] = useState(false);
    const [placeholder, setPlaceholder] = useState("Enter friend ID");

    const onSubmit = async function() {
        // config['data']['friendName'] = friendID;

        // axios(config)
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //         onFriendChange("");
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         onFriendChange("");
        //     });
        // console.log('qr code view opened')

    }

    return (
        <View style = {styles.Background}>
            <View style = {[styles.InputContainer, {flex: 20, marginTop : '0%', marginHorizontal : '0%'}]}>
                <View style = {[styles.SubmitContainer,{justifyContent : 'center'}]}>
                    <Pressable style = {styles.ButtonValid}
                               onPress = {onSubmit}>
                        <Text style = {styles.RequestText}>
                            Scan QR Code
                        </Text>
                    </Pressable>
                </View>

            </View>

            <View style = {styles.SeparatorContainer}>
            </View>

        </View>
    )

}

export default LeagueInvite;
