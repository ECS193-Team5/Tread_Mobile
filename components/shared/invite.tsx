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

function Invite({text, config}): JSX.Element {
    const [friendID, setFriendID] = useState("");
    const [validID, setValidID] = useState(false);
    const [placeholder, setPlaceholder] = useState("Enter friend ID");

    const onFriendChange = function(id) {
        console.log(id);
        setFriendID(id);
        if(checkValidID(id)) {
            setValidID(true);
        } else {
            setValidID(false);
        }
    }

    const checkValidID = function(id) {
        return id.length > 0
    }
    const onSubmit = async function() {
        config['data']['friendName'] = friendID;

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                onFriendChange("");
            })
            .catch(function (error) {
                console.log(error);
                onFriendChange("");
            });
    }

    return (
        <View style = {styles.Background}>
            <View style = {styles.TitleContainer}>
                <Text style = {styles.Title}>
                    {text}
                </Text>
            </View>

            <View style = {styles.InputContainer}>
                <View style = {styles.FriendContainer}>
                    <TextInput
                        placeholder = "Enter User ID"
                        placeholderTextColor= "grey"
                        style = {styles.Input}
                        onChangeText = {onFriendChange}
                        value = {friendID}
                    >
                    </TextInput>
                </View>

                <View style = {styles.SubmitContainer}>
                    <Pressable style = {validID ? styles.ButtonValid : styles.ButtonInvalid}
                               onPress = {onSubmit}
                               disabled = {!validID}>
                        <Text style = {styles.RequestText}>
                            Send Request
                        </Text>
                    </Pressable>
                </View>

            </View>

            <View style = {styles.SeparatorContainer}>
            </View>

        </View>
    )

}

export default Invite;
