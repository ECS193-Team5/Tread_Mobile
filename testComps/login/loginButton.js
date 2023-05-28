import React, {useEffect, useState} from 'react';
import {
    Text,
    TouchableHighlight
} from 'react-native';

import {LoginStyles} from '../../css/login/Style';
import {GoogleSignin} from "@react-native-google-signin/google-signin";


// import axios from "axios";
// import loginConfig from "../../routes/login/login";

import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, VAPID_KEY} from '@env';
import {log} from "qrcode/lib/core/galois-field";


function LoginButton({filled, text, isLogin, loginMock, navigate}) {
    // let autoLogin = true;
    const [autoLogin, setAutoLogin] = useState(true);

    useEffect(() => {
        GoogleSignin.isSignedIn().then((response) => {
            if(response) {
                if(filled) {
                    configureGoogleSignIn();
                    signInGoogleSilently();
                }
            } else {
                setAutoLogin(false)
            }
        })
    })

    const onLoginPress = function () {
        if(!autoLogin) {
            configureGoogleSignIn();
            signInGoogle();
        }
    }

    const configureGoogleSignIn = function() {
        GoogleSignin.configure({
            offlineAccess: true,
            webClientId: WEB_CLIENT,
            iosClientId: IOS_CLIENT
        });
    }

    const signInGoogle = function () {
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                    login(userInfo['user']['email'], userInfo['idToken'], userInfo['user']['photo']);
                }).catch((e) => {
                    console.log("ERROR IS A: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            console.log("ERROR IS B: " + JSON.stringify(e));
        })
    }

    const signInGoogleSilently = function () {
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signInSilently().then((userInfo) => {
                    login();
                }).catch((e) => {
                    console.log("ERROR IS A: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            console.log("ERROR IS B: " + JSON.stringify(e));
        })
    }

    const getFCMToken = async() => {
        return ""
    }

    const login =  () => {

        const deviceToken =  getFCMToken()
        if(loginMock !== null) {
            if(loginMock) {
                // setAutoLogin(false);


            } else {
                // setAutoLogin(false);


            }
        }
    }


    return (
        <TouchableHighlight
            style = {filled ? LoginStyles.loginButton : LoginStyles.signupButton}
            onPress={onLoginPress}
            underlayColor = {isLogin ? '#dedfe0' : '#161717'}
            testID="button"
        >
            <Text style={filled ? LoginStyles.loginButtonText : LoginStyles.signupButtonText}>{text}</Text>
        </TouchableHighlight>
    )
}

export default LoginButton;