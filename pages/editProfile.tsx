import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    // CheckBox,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '@env';
import axios from 'axios';

import {styles} from '../css/signup/Style';
import {launchImageLibrary} from 'react-native-image-picker';

import CheckBox from '@react-native-community/checkbox';

function EditProfile(props): JSX.Element {

    const [displayName, setDisplayName] = useState("");
    const [validDisplayName, setValidDisplayName] = useState(true);
    const [oldDisplayName, setOldDisplayName] = useState("");


    const [picture, setPicture] = useState({});
    const [validPicture, setValidPicture] = useState(false);


    useEffect(() => {
        getDisplayName()
    }, [])

    const onChoosePicPress = function() {
        const options = {
            'includeBase64': true,
            'maxWidth': 200,
            'maxHeight': 200
        }

        launchImageLibrary(options, (response) => {
            if(!response['didCancel']) {
                console.log('Picture Chosen');
                const source = response['assets'][0]["base64"];
                setPicture("data:image/jpeg;base64," + source)
                setValidPicture(true);
            }
        });
    }

    const getDisplayName = function() {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'user/get_display_name',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data['displayName'])
                setDisplayName(response.data['displayName'])
                setOldDisplayName(response.data['displayName'])
            })
            .catch((error) =>
                console.log(error)
            )
    }

    const updatePicture = async function() {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'user/update_picture',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            },
            data: {
                'picture' : picture
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateDisplayName = async function() {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'user/update_display_name',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            },
            data: {
                displayName : displayName
            }
        };

        console.log(displayName);
        axios(config)
            .then(function (response) {
                console.log('Updated display name')
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleOnPress = async function() {
        if(validPicture) {
            await updatePicture();
        }

        if(validDisplayName && (displayName !== oldDisplayName)) {
            await updateDisplayName()
        }
    }
//
    const checkValidName = function(name) {
        // console.log(name)
        return name.length > 0
    }

    const handleDisplayNameChange = function(item) {
        setDisplayName(item)
        if(checkValidName(item)) {
            setValidDisplayName(true);
        } else {
            setValidDisplayName(false);
        }
    }

    return (
        <View style = {styles.mainContainer}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>
                    Edit profile
                </Text>
            </View>
            <View style = {styles.formContainer}>
                <TextInput
                    placeholder = "Display Name"
                    placeholderTextColor= "grey"
                    style = {validDisplayName ? styles.validInput : styles.invalidInput}
                    onChangeText = {handleDisplayNameChange}
                    value = {displayName}
                />

                <Pressable style = {styles.ChoosePicButton} onPress = {onChoosePicPress}>
                    <Text style = {styles.ChoosePicText}>
                        Choose Picture
                    </Text>
                </Pressable>

            </View>
            <View style = {styles.checkContainer}>
            </View>
            <View style = {styles.signupContainer}>
                <Pressable style = {(validDisplayName && (displayName !== oldDisplayName)) || validPicture ? styles.validSignupButton : styles.invalidSignupButton}
                           disabled = {!((validDisplayName && (displayName !== oldDisplayName)) || validPicture)}
                           onPress = {handleOnPress}>
                    <Text style = {styles.signupText}>
                        Edit Profile
                    </Text>
                </Pressable>

            </View>
            <View style = {styles.signinContainer}>
            </View>
        </View>
    )
}


export default EditProfile;