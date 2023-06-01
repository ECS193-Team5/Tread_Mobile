import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  StatusBar,
  Keyboard,
  TouchableHighlight,
} from 'react-native';

import { styles } from '../css/add/league/Style';

import SwitchSelector from "react-native-switch-selector";

import { BACKEND_URL } from '@env';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import ImageUpload from "../components/shared/ImageUpload";
import InputForm from "../components/shared/InputForm";
import { createLeaguePictureURL } from '../components/Helpers/CloudinaryURLHelper';
import GestureRecognizer from 'react-native-swipe-gestures';

const switchOptions = [
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' }
];


function EditLeaguePage(props): JSX.Element {
  const [picture, setPicture] = useState(createLeaguePictureURL(props.route.params.leagueData._id));
  const [validPicture, setValidPicture] = useState(false);

  const [oldleagueName, setOldLeagueName] = useState(props.route.params.name);
  const [leagueName, setLeagueName] = useState(props.route.params.name);
  const [validLeagueName, setValidLeagueName] = useState(true);

  const [oldleagueDesc, setOldLeagueDesc] = useState(props.route.params.description);
  const [leagueDesc, setLeagueDesc] = useState(props.route.params.description);
  const [validLeagueDesc, setValidLeagueDesc] = useState(true);

  const [oldsecurity, setOldSecurity] = useState(props.route.params.security);
  const [security, setSecurity] = useState(props.route.params.security);

  const [submitError, setSubmitError] = useState('')

  const submitNewPhoto = function(){

    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/update_picture',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data: {leaguePicture: picture, leagueID: props.route.params.leagueData._id}
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data)
      })
      .catch(function(error){
        showMessage({
          floating : true,
          message : 'Error updating League Photo',
          type : 'danger',
        })
        setSubmitError('Error Updating League Picture')
    });
  }

  const submitNewName = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/update_name',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data: {
        leagueName : leagueName,
        leagueID : props.route.params.leagueData._id
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function(error){
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error updating League name',
          type : 'danger',
        })
        setSubmitError('Error Updating League Name')
    });
  }

  const submitNewDesc = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/update_description',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data: {
        leagueDescription : leagueDesc,
        leagueID : props.route.params.leagueData._id
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function(error){
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error updating League Description',
          type : 'danger',
        })
        setSubmitError('Error Updating League Description')
    });
  }

  const submitNewSecurity = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/update_type',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data: {
        leagueType : security,
        leagueID : props.route.params.leagueData._id
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function(error){
        console.log(error)
        showMessage({
          floating : true,
          message : 'Error updating League Security',
          type : 'danger',
        })
        setSubmitError('Error Updating League Security')
    });
  }

  const onSubmit = async function () {
    if (validPicture){
      await submitNewPhoto()
    }
    if (leagueName !== oldleagueName){
      await submitNewName()
    }
    if (leagueDesc !== oldleagueDesc){
      await submitNewDesc()
    }
    if (security !== oldsecurity){
      await submitNewSecurity()
    }

    console.log(submitError)

    if(submitError.length === 0){
      showMessage({
        floating : true,
        message : 'Successfully Updated League Data',
        backgroundColor : '#014421',
        color : '#F9A800',
      })
    }
    props.navigation.navigate("League Details", {leagueData : props.route.params.leagueData})
  }

  return (
    <GestureRecognizer
    onSwipeDown = {() => Keyboard.dismiss()}
    style={[styles.Background, {paddingTop:(Platform.OS === 'ios') ? "12%" : 0}]}
    >
      <StatusBar
        barStyle="dark-content"
      />
        <View style = {styles.PageInfoContainer}>
          <Text style = {styles.TitleText}>Edit League</Text>
        </View>

        <View style={[styles.InputContainer, {marginTop : '0%', marginBottom : '25%'}]}>
          <View style={styles.ChoosePicContainer}>
            <ImageUpload
              flex={2}
              picture={picture}
              setPicture={setPicture}
              valid={validPicture}
              setValidPicture={setValidPicture}
              placeholder={'https://imgur.com/a/5IVD5Ew'}
            ></ImageUpload>
          </View>

          <View style={styles.EnterLeagueContainer}>
            <InputForm
              placeholder={'Enter league name'}
              value={leagueName}
              setValue={setLeagueName}
              valid={validLeagueName}
              setValid={setValidLeagueName}
              editable={true}
              name = {true}
            >
            </InputForm>
          </View>

          <View style={styles.EnterDescContainer}>
            <InputForm
              placeholder={'Enter league description'}
              value={leagueDesc}
              setValue={setLeagueDesc}
              valid={validLeagueDesc}
              setValid={setValidLeagueDesc}
              editable={true}
              multiline={true}
              allowSpecial={true}
              name = {false}
            >
            </InputForm>

          </View>

          <View style={styles.InputTitle}>
            <Text style={styles.InputTitleText}>
              Security
            </Text>
          </View>

          <View style={styles.ChooseSecContainer}>
                <SwitchSelector
                  options={switchOptions}
                  initial={security === 'private' ? 0 : 1}
                  selectedColor='white'
                  textColor='#014421'
                  buttonColor='#014421'
                  borderColor='#014421'
                  onPress={setSecurity}
                  hasPadding={true}
                >
                </SwitchSelector>
              </View>

          <View style={styles.EnterButtonContainer}>
            <TouchableHighlight
              style={((validLeagueName && (leagueName !== oldleagueName)) || (validLeagueDesc && (leagueDesc !== oldleagueDesc)) || (oldsecurity !== security) || validPicture) ? styles.EnterButtonValid : styles.EnterButtonInvalid}
              disabled={!((validLeagueName && (leagueName !== oldleagueName)) || (validLeagueDesc && (leagueDesc !== oldleagueDesc)) || (oldsecurity !== security)|| validPicture)}
              underlayColor = '#013319'
              onPress={onSubmit}
            >
              <Text style={styles.ChoosePicText}>
                Submit
              </Text>
            </TouchableHighlight>
          </View>
        </View>
    </GestureRecognizer>
  )
}

export default EditLeaguePage;
