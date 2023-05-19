import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    // CheckBox,
} from 'react-native';

import {BACKEND_URL} from '@env';
import axios from 'axios';


import styles from '../css/profile/edit/Styles'
import ImageUpload from "../components/shared/ImageUpload";
import InputForm from "../components/shared/InputForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

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
    }

    const handleOnDelete = function() {
        deleteAccount();
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
      <View style={styles.MainContainer}>
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
              <Pressable style = {((validDisplayName && (displayName !== oldDisplayName)) || validPicture)? styles.validSignupButton : styles.invalidSignupButton}
                         disabled = {!(((validDisplayName && (displayName !== oldDisplayName)) || validPicture))}
                         onPress = {handleOnSubmit}>
                  <Text style = {styles.signupText}>
                      Update Profile
                  </Text>
              </Pressable>

          </View>

          <View style={styles.DeleteContainer}>
              <Pressable style = {styles.deleteButton}
                         onPress = {handleOnDelete}>
                  <Text style = {styles.signupText}>
                      Delete Account
                  </Text>
              </Pressable>

          </View>

      </View>
    )
}


export default EditProfile;