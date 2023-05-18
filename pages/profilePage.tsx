import React, {useEffect, useRef, useState} from 'react';
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
import Modal from "react-native-modal";
import QRModalPopUp from "../components/shared/QRModalPopUp";
import MenuPopUp from "../components/profile/MenuPopUp";
import {modalstyle} from "../css/shared/modalStyle";
import SwitchSelector from "react-native-switch-selector";
import MedalScroll from "../components/profile/medalScroll";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cardStyles } from '../css/cards/Style';


function ProfilePage(props): JSX.Element {
	const signOut = async () => {
		try {
			await GoogleSignin.signOut();
		} catch (error) {
			console.error(error);
		}
	};

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
    const [openQR, setOpenQR] = useState(false)

    const [modalVisiblePopUp, setModalVisiblePopUp] = useState(false)
    const [medalType, setMedalType] = useState('progress');

    const [medalInfoProgress, setMedalInfoProgress] = useState([])
    const [medalInfoEarned, setMedalInfoEarned] = useState([])

    useEffect(() => {
        getProfilePhoto()
        getDisplayName()
        getUserName()
        getFriends()
        getLeagues()
        getMedalsEarned()
        getMedalsProgress()
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

    const getMedalsEarned = function() {
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
                setMedalInfoEarned(response.data)
            })
            .catch((error) =>
                console.log(error)
            )
    }

    const getMedalsProgress = function () {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'medals/get_in_progress',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(response.data)
                setMedalInfoProgress(response.data)
            })
            .catch((error) =>
                console.log(error)
            )

    }

    const handleRefresh = function() {
        getMedalsProgress()
    }

    const handlePopup = function() {
        console.log(modalVisiblePopUp)
        setModalVisiblePopUp(true)
    }

    const handleEdit = function() {
        setModalVisiblePopUp(false)
        props.navigation.navigate('EditProfile')
        // console.log('edit')
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
    const storeLogOut = async () => {
        await AsyncStorage.setItem('loggedIn', 'false');
    }

    const handleLogout = function() {
        console.log('logout')
        storeLogOut().then((response) => {
            signOut().then(response => {
                props.navigation.navigate('Login')
            })
        })
    }


    const LogoutClickable = function(){
        return(
            <TouchableHighlight
                onPress={handleLogout}
                style = {{borderBottomRightRadius : 20, borderBottomLeftRadius : 20}}
                underlayColor = 'rgba(0,0,0,0.15)'
            >
                <View style = {{flexDirection : 'row', marginVertical : '2%'}} >
                    <Text style = {[modalstyle.PopUpOptionText , {flex : 50, color : 'red'}]}> Logout </Text>
                    <Image style ={ImageStyles.Edit} source={{uri: 'https://i.imgur.com/Yv8lfL7.png'}}/>
                </View>
            </TouchableHighlight>
        )
    }

    const handleQRClick = function() {
        setModalVisiblePopUp(false)
        setOpenQR(true)
    }
    const QRClickable = function(){
        return(
            <TouchableHighlight
                onPress={handleQRClick}
                underlayColor = 'rgba(0,0,0,0.15)'
            >
                <View style = {{flexDirection : 'row', marginVertical : '2%'}} >
                    <Text style = {[modalstyle.PopUpOptionText , {flex : 50}]}> Show QR </Text>
                    <Image style ={ImageStyles.Edit} source={{uri: 'https://i.imgur.com/vdw15Hl.png'}}/>
                </View>
            </TouchableHighlight>
        )
    }

    const handleQRModal = function(){
      if(openQR){
        setModalVisibleQR(true)
      } 
      setOpenQR(false)
    }
  
    const switchRef = useRef(null)

    return (
      <View style={ProfileStyles.Background}>
          <View style={ProfileStyles.TopSeparator}>
          </View>
              <Modal
                  isVisible={modalVisibleQR}
                  hasBackdrop = {true}
                  swipeDirection = 'down'
                  onSwipeComplete={(e) => setModalVisibleQR(false)}
                  backdropColor = 'black'
                  onBackdropPress = {() => setModalVisibleQR(false)}
                  style = {{margin : 2}}
              >
                  <QRModalPopUp
                      Name = {userName}
                      isLeague = {false}
                      security = {""}
                  />
              </Modal>

          <Modal
              isVisible={modalVisiblePopUp}
              hasBackdrop = {true}
              backdropColor = 'rgba(0,0,0,0.7)'
              onBackdropPress = { () => setModalVisiblePopUp(false)}
              onModalHide = {handleQRModal}
              style = {{margin : 2}}
              animationIn = 'fadeIn'
              animationInTiming={160}
              animationOut = 'fadeOut'
              animationOutTiming={100}
          >
              <MenuPopUp
                  options = {[EditClickable, QRClickable, LogoutClickable]}
              />
          </Modal>


          <View style={[ProfileStyles.ProfileContainer, cardStyles.shadowProp]}>
              <View style={ProfileStyles.ProfileCard}>
                <View style = {ProfileStyles.ProfileSettingsContainer}>
                  <View style={ProfileStyles.OptionsContainer}>
                    <Pressable
                        onPress={handlePopup}
                    >
                        <Image style ={ImageStyles.Options} source={{uri: 'https://i.imgur.com/RtnN9Hu.png'}}/>
                    </Pressable>
                  </View>
                </View>
                
                <View style={ProfileStyles.ProfileTopContainer}>
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

                    </View>
                </View>
                <View style={ProfileStyles.ProfileBottomContainer}>
                    <View style={ProfileStyles.OtherInfoContainer}>
                      <TouchableHighlight
                          onPress={() => props.navigation.navigate('Friends')}
                          style = {{alignSelf : 'center', borderRadius : 1}}
                          underlayColor = 'rgba(0,0,0,0.15)'
                          >
                          <Text style={ProfileStyles.OtherInfoText}>
                            {numFriends.toString()}  
                            <Text style = {ProfileStyles.SecondaryText}>
                               {(numFriends === 1 ? " Friend" : " Friends")}
                            </Text>
                          </Text>
                      </TouchableHighlight>
                    </View>
                    <View style={ProfileStyles.OtherInfoContainer}>
                      <TouchableHighlight
                          onPress={() => props.navigation.navigate('Leagues', {screen : 'Leagues'})}
                          style = {{alignSelf : 'center',borderRadius : 1}}
                          underlayColor = 'rgba(0,0,0,0.15)'
                          >
                          <Text style={ProfileStyles.OtherInfoText}>
                            {numLeagues.toString()}  
                            <Text style = {ProfileStyles.SecondaryText}>
                               {(numLeagues === 1 ? " League" : " Leagues")}
                            </Text>
                          </Text>
                      </TouchableHighlight>
                    </View>
                    <View style={ProfileStyles.OtherInfoContainer}>
                      <TouchableHighlight
                          onPress={() => switchRef.current?.toggleItem(1)}
                          style = {{alignSelf : 'center',borderRadius : 1}}
                          underlayColor = 'rgba(0,0,0,0.15)'
                          >
                          <Text style={ProfileStyles.OtherInfoText}>
                            {numMedals.toString()}  
                            <Text style = {ProfileStyles.SecondaryText}>
                               {(numMedals === 1 ? " Medal" : " Medals")}
                            </Text>
                          </Text>
                      </TouchableHighlight>
                    </View>
                </View>
              </View>
          </View>
          <View style={ProfileStyles.MedalsContainer}>
            <View style={ProfileStyles.Separator}>
            </View>

            <View style={ProfileStyles.MedalType}>
              <SwitchSelector
                  ref = {switchRef}
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
            <View style={ProfileStyles.MedalScroll}>
                <MedalScroll
                    MedalData={medalType === 'progress' ? medalInfoProgress : medalInfoEarned}
                    onRefresh = {handleRefresh}
                />

            </View>


          </View>

      </View>
    )
}

export default ProfilePage;
