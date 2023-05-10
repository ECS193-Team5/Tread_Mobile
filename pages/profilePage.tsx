import React, {useEffect, useState} from 'react';
import {
    View,
    Button,
    StyleSheet,
    Image,
    Text, Pressable, TouchableHighlight
} from 'react-native';

import {ProfileStyles} from "../css/profile/Style";
import { ImageStyles } from '../css/imageCluster/Style';
import {BACKEND_URL} from '@env';
import {
	GoogleSignin,
} from '@react-native-google-signin/google-signin';
import axios from "axios/index";
import GestureRecognizer from "react-native-swipe-gestures";
import Modal from "react-native-modal";
import QRModalPopUp from "../components/shared/QRModalPopUp";
import MenuPopUp from "../components/shared/MenuPopUp";
import {modalstyle} from "../css/shared/modalStyle";
import SwitchSelector from "react-native-switch-selector";
import {styles} from "../css/challenges/Style";


function ProfilePage(props): JSX.Element {
	// signOut = async () => {
	// 	try {
	// 		await GoogleSignin.signOut();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

    const options = [
        { label : "In progress" , value : 'progress'},
        { label : "Completed", value : 'complete'}
    ]

    const [profilePhotoURL, setProfilePhotoURL] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [userName, setUserName] = useState("")

    const [numFriends, setNumFriends] = useState(0);
    const [numLeagues, setNumLeagues] = useState(0);
    const [numMedals, setNumMedals] = useState(0);

    const [modalVisibleQR, setModalVisibleQR] = useState(false)
    const [modalVisiblePopUp, setModalVisiblePopUp] = useState(false)
    const [medalType, setMedalType] = useState('progress');

    useEffect(() => {
        getProfilePhoto()
        getDisplayName()
        getUserName()
        getFriends()
        getLeagues()
        getMedals()
    }, [])
    const getProfilePhoto = function() {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'sign_up/get_profile_photo',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data)
                setProfilePhotoURL(response.data)
            })
            .catch((error) =>
                console.log(error)
            )
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
            })
            .catch((error) =>
                console.log(error)
            )
    }

    const getUserName = function() {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'user/get_username',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data)
                setUserName('@' + response.data)
            })
            .catch((error) =>
                console.log(error)
            )
    }

    const getFriends = function() {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'friend_list/friend_list',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data.length)
                setNumFriends(response.data.length)
            })
            .catch((error) =>
                console.log(error)
            )
    }

    const getLeagues = function() {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'league/get_leagues',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data.length)
                setNumLeagues(response.data.length)
            })
            .catch((error) =>
                console.log(error)
            )
    }

    const getMedals = function() {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'medals/get_earned',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data.length)
                setNumMedals(response.data.length)
            })
            .catch((error) =>
                console.log(error)
            )
    }

    const handleQR = function() {
        // console.log("QR")
        setModalVisibleQR(true)
    }

    const handlePopup = function() {
        setModalVisiblePopUp(true)
    }

    const handleEdit = function() {
        console.log('edit')
    }

    const EditClickable = function(){
        return(
            <TouchableHighlight
                onPress={handleEdit}
                style = {{borderTopRightRadius : 20, borderTopLeftRadius : 20}}
                underlayColor = 'rgba(0,0,0,0.15)'
            >
                <View style = {{flexDirection : 'row', marginVertical : '2%'}} >
                    <Text style = {[modalstyle.PopUpOptionText , {flex : 50}]}> Edit </Text>
                    <Image style ={ImageStyles.Edit} source={{uri: 'https://imgur.com/tRs9SvT.png'}}/>
                </View>
            </TouchableHighlight>
        )
    }

    const handleLogout = function() {
        console.log('logout')
    }


    const LogoutClickable = function(){
        return(
            <TouchableHighlight
                onPress={handleLogout}
                style = {{borderTopRightRadius : 20, borderTopLeftRadius : 20}}
                underlayColor = 'rgba(0,0,0,0.15)'
            >
                <View style = {{flexDirection : 'row', marginVertical : '2%'}} >
                    <Text style = {[modalstyle.PopUpOptionText , {flex : 50}]}> Logout </Text>
                    <Image style ={ImageStyles.Edit} source={{uri: 'https://i.imgur.com/Yv8lfL7.png'}}/>
                </View>
            </TouchableHighlight>
        )
    }


    return (
      <View style={ProfileStyles.Background}>
          <View style={ProfileStyles.TopSeparator}>
          </View>

          <GestureRecognizer
              onSwipeDown={() => setModalVisibleQR(false)}
          >
              <Modal
                  isVisible={modalVisibleQR}
                  hasBackdrop = {true}
                  backdropColor = 'black'
                  style = {{margin : 2}}
              >
                  <QRModalPopUp
                      Name = {userName}
                      isLeague = {false}
                      security = {""}
                  />
              </Modal>
          </GestureRecognizer>

          <Modal
              isVisible={modalVisiblePopUp}
              hasBackdrop = {true}
              backdropColor = 'rgba(0,0,0,0.7)'
              onBackdropPress = { () => setModalVisiblePopUp(false)}
              style = {{margin : 2}}
              animationIn = 'fadeIn'
              animationInTiming={160}
              animationOut = 'fadeOut'
              animationOutTiming={100}
          >
              <MenuPopUp
                  options = {[EditClickable, LogoutClickable]}
              />
          </Modal>


          <View style={ProfileStyles.ProfileContainer}>
              <View style={ProfileStyles.ProfileCard}>
                <View style={ProfileStyles.ProfileInfoContainer}>
                    <View style={ProfileStyles.ProfileImageContainer}>
                        <Image
                            src={profilePhotoURL}
                            style={ProfileStyles.ProfileImage}
                        >
                        </Image>
                    </View>

                    <View style={ProfileStyles.ProfileNameContainer}>
                        <View style={ProfileStyles.DisplayNameContainer}>
                            <Text style={ProfileStyles.DisplayNameText}>
                                {displayName}
                            </Text>
                        </View>
                        <View style={ProfileStyles.UsernameContainer}>
                            <Text style={ProfileStyles.UsernameText}>
                                {userName}
                            </Text>
                        </View>
                        <View style={ProfileStyles.OtherInfoContainer}>
                            <Text style={ProfileStyles.OtherInfoText}>
                                {numFriends.toString() + " Friends"}
                            </Text>
                        </View>
                        <View style={ProfileStyles.OtherInfoContainer}>
                            <Text style={ProfileStyles.OtherInfoText}>
                                {numLeagues.toString() + " Leagues"}
                            </Text>
                        </View>
                        <View style={ProfileStyles.OtherInfoContainer}>
                            <Text style={ProfileStyles.OtherInfoText}>
                                {numMedals.toString() + " Medals"}
                            </Text>
                        </View>

                    </View>
                </View>
                <View style={ProfileStyles.ProfileToggleContainer}>
                    <View style={ProfileStyles.OptionsContainer}>
                        <Pressable
                            onPress={handlePopup}
                        >
                            <Image style ={ImageStyles.Options} source={{uri: 'https://imgur.com/G0SHXKl.png'}}/>
                        </Pressable>

                    </View>
                    <View style={ProfileStyles.QRContainer}>
                        <Pressable
                            onPress={() => handleQR()}
                        >
                            <Image style ={ImageStyles.QR} source={{uri: 'https://imgur.com/cC2QHxO.png'}}/>
                        </Pressable>

                    </View>
                </View>
              </View>
          </View>
          <View style={ProfileStyles.MedalsContainer}>
            <View style={ProfileStyles.Separator}>
            </View>

            <View style={ProfileStyles.MedalType}>
              <SwitchSelector
                  initial= {0}
                  onPress = {setMedalType}
                  textColor = {'#014421'}
                  selectedColor = {'#F9A800'}
                  buttonColor = {'#014421'}
                  hasPadding
                  options = {options}
              >
              </SwitchSelector>
            </View>

          </View>

      </View>
    )
}

export default ProfilePage;
