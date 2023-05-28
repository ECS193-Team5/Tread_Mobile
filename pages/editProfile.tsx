import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    Alert,
    Keyboard,
    TouchableHighlight,
} from 'react-native';

import {BACKEND_URL} from '@env';
import axios from 'axios';


import styles from '../css/profile/edit/Styles'
import ImageUpload from "../components/shared/ImageUpload";
import InputForm from "../components/shared/InputForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import GestureRecognizer from 'react-native-swipe-gestures';
import { showMessage } from 'react-native-flash-message';

function EditProfile({route, navigation}): JSX.Element {

    const [oldDisplayName, setOldDisplayName] = useState(route.params.displayName);
    const [displayName, setDisplayName] = useState(route.params.displayName);
    const [validDisplayName, setValidDisplayName] = useState(true);


    const [picture, setPicture] = useState({});
    const [validPicture, setValidPicture] = useState(false);

    const handleOnSubmit = function() {
        if(validDisplayName) {
            updateDisplayName()
        }

        if(validPicture) {
            updatePicture()
        }

        showMessage({
          floating : true,
          message : 'Updated your information. Reload the app to see new changes',
          backgroundColor : '#014421',
          color : '#F9A800',
        })
    }

    const makeSure = function() {
      Alert.alert('Are you sure you want to delete your account ?', undefined,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: deleteAccount,
          style : 'destructive'
        },
      ]);  
    }

    const handleOnDelete = function() {
      Alert.alert('Delete your account ?',
      'This will permanently delete your account. You will lose all your friends, leagues, and medals. All your information will be gone with no way to recover it.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete Account',
          onPress: makeSure,
          style : 'destructive'
        },
      ]);  
    }

    const storeLogOut = async () => {
        await AsyncStorage.setItem('loggedIn', 'false');
    }

    const logout = function() {
        // console.log('logout')
        storeLogOut().then((response) => {
            signOut().then(response => {
                navigation.navigate('Login')
            })
        })
    }

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteAccount = async function() {
      await AsyncStorage.setItem('Apple', JSON.stringify(false))
      await AsyncStorage.setItem('AppleUser', JSON.stringify(false))
        var config = {
            method: 'delete',
            url: BACKEND_URL + 'delete_user',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        };

        axios(config)
          .then(function (response) {
              logout();
          })
          .catch(function (error) {
              console.log(error);
          });
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
                navigation.navigate('Profile',{
                    refresh: true
                })
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
                navigation.navigate('Profile',{
                    refresh: true
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
      <GestureRecognizer
        onSwipeDown = {() => Keyboard.dismiss()}
        style={styles.MainContainer}      
      >
          <View style={styles.TitleContainer}>
              <Text style={styles.TitleText}>
                  Edit Profile
              </Text>
          </View>

          <View style={styles.InputContainers}>
              <ImageUpload
                flex = {4.5}
                placeholder = {route.params.picture}
                picture={picture}
                setPicture={setPicture}
                valid={validPicture}
                setValidPicture={setValidPicture}

              ></ImageUpload>
              <View style={styles.DisplayNameInput}>
                  <InputForm
                    value={displayName}
                    setValue={setDisplayName}
                    valid={validDisplayName}
                    setValid={setValidDisplayName}
                    editable={true}
                  >
                  </InputForm>
              </View>

          </View>

          <View style={styles.SubmitContainer}>
              <TouchableHighlight style = {((validDisplayName && (displayName !== oldDisplayName)) || validPicture)? styles.validSignupButton : styles.invalidSignupButton}
                         disabled = {!(((validDisplayName && (displayName !== oldDisplayName)) || validPicture))}
                         underlayColor = '#013319'
                         onPress = {handleOnSubmit}>
                  <Text style = {styles.signupText}>
                      Update Profile
                  </Text>
              </TouchableHighlight>

          </View>

          <View style={styles.DeleteContainer}>
              <TouchableHighlight style = {styles.deleteButton}
                         onPress = {handleOnDelete}
                         underlayColor = '#b32727'
                         >
                  <Text style = {styles.signupText}>
                      Delete Account
                  </Text>
              </TouchableHighlight>

          </View>

      </GestureRecognizer>
    )
}


export default EditProfile;