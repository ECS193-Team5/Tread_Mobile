import React, {useEffect, useState} from 'react';
import {
    View,
    Button,
    StyleSheet,
    Image,
    Text
} from 'react-native';

import {ProfileStyles} from "../css/profile/Style";
import {BACKEND_URL} from '@env';
import {
	GoogleSignin,
} from '@react-native-google-signin/google-signin';
import axios from "axios/index";

function ProfilePage(props): JSX.Element {
	// signOut = async () => {
	// 	try {
	// 		await GoogleSignin.signOut();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

    const [profilePhotoURL, setProfilePhotoURL] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [userName, setUserName] = useState("")
    const [numFriends, setNumFriends] = useState(0);
    const [numLeagues, setNumLeagues] = useState(0);
    const [numMedals, setNumMedals] = useState(0);


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

    return (
      <View style={ProfileStyles.Background}>
          <View style={ProfileStyles.TopSeparator}>

          </View>
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

                </View>
              </View>
          </View>
          <View style={ProfileStyles.MedalsContainer}>

          </View>

      </View>
    )
}

export default ProfilePage;
