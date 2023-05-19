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

function EditProfile({route, navigation}): JSX.Element {

    const [displayName, setDisplayName] = useState("");
    const [validDisplayName, setValidDisplayName] = useState(false);

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
                // console.log(JSON.stringify(response.data));
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
                // console.log(JSON.stringify(response.data));
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
                    placeholder={route.params.displayName}
                    value={displayName}
                    setValue={setDisplayName}
                    valid={validDisplayName}
                    setValid={setValidDisplayName}
                    editable={true}
                    allowSpecial={null}
                  >
                  </InputForm>
              </View>

          </View>

          <View style={styles.SubmitContainer}>
              <Pressable style = {(validDisplayName || validPicture)? styles.validSignupButton : styles.invalidSignupButton}
                         disabled = {!((validDisplayName || validPicture))}
                         onPress = {handleOnSubmit}>
                  <Text style = {styles.signupText}>
                      Update Profile
                  </Text>
              </Pressable>

          </View>

          <View style={styles.DeleteContainer}>
              <Pressable style = {styles.deleteButton}
                         onPress = {handleOnSubmit}>
                  <Text style = {styles.signupText}>
                      Delete Account
                  </Text>
              </Pressable>

          </View>

      </View>
    )
}


export default EditProfile;