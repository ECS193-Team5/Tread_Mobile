import React, {useEffect, useState} from 'react';
import {
    View,
    Button,
    StyleSheet, Image
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

    useEffect(() => {
        getProfilePhoto()
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
                console.log(response.data)
                setProfilePhotoURL(response.data)
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
