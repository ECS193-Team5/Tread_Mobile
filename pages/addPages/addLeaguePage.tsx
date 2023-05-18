import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';

import { styles } from '../../css/add/league/Style';

import { launchImageLibrary } from 'react-native-image-picker';
import SwitchSelector from "react-native-switch-selector";

import { BACKEND_URL } from '@env';
import axios from 'axios';
import LeagueInvite from '../../components/shared/LeagueInvite';
import { showMessage } from 'react-native-flash-message';
import ImageUpload from "../../components/shared/ImageUpload";
import InputForm from "../../components/shared/InputForm";
import createLeague from "../../routes/add/createLeague";

const options = [
  { label: "Create", value: true },
  { label: "Join", value: false }
]

function AddLeaguePage(props): JSX.Element {
  const [qrValue, setQrValue] = useState('')
  const [openScanner, setOpenScanner] = useState(false)
  const [defaultTab, setDefaultTab] = useState(!props.route.params.defaultView)

  const [picture, setPicture] = useState('https://i.imgur.com/sXwXq45.png');
  const [validPicture, setValidPicture] = useState(true);

  const [leagueName, setLeagueName] = useState("");
  const [validLeagueName, setValidLeagueName] = useState(false);

  const [leagueDesc, setLeagueDesc] = useState("");
  const [validLeagueDesc, setValidLeagueDesc] = useState(false);

  const [security, setSecurity] = useState("private");

  const [isCreate, setIsCreate] = useState(props.route.params.defaultView)

  const switchOptions = [
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' }
  ];

  const sendLeagueRequest = (leagueID) => {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/user_request_to_join',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data: {
        leagueID: leagueID
      }
    };


    axios(config)
      .then(function (response) {
        props.navigation.navigate("Leagues", { defaultView: false })
      })
      .catch((error) =>{
        console.log(error);
        setQrValue("Already joined this league")}
      )


  }

  const onBarcodeScan = function (qrvalue) {
    if(qrvalue.startsWith("https://tread.run/requestLeague?")){
      qrvalue = qrvalue.split("?")[1];
      sendLeagueRequest(qrvalue);
    }
    setQrValue(qrvalue)
    setOpenScanner(false)
    props.navigation.navigate("AddLeague", {defaultView : false})

  }

  const handleBack = function (qrValue) {
    setOpenScanner(false)
    props.navigation.navigate("AddLeague", { defaultView: false })
  }

  const onOpenScanner = function () {
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setQrValue('');
            setOpenScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      setQrValue('');
      setOpenScanner(true);
    }
  }


  const handleDropDown = function (selectedItem) {
    console.log(selectedItem)
    setIsCreate(selectedItem)
  }

  const onSubmit = function () {
    axios(createLeague(leagueName, leagueDesc, security, picture))
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        props.navigation.navigate('AddAll')
        showMessage({
          floating: true,
          message: 'League Created',
          backgroundColor: '#014421',
          color: '#F9A800',
        })
      })
      .catch(function (error) {
        console.log(error);
        showMessage({
          floating: true,
          message: 'Error creating league',
          type: 'danger',
        })
      });
  }

  return (
    <View style={styles.Background}>
      <StatusBar
        barStyle="dark-content"
      />

      {openScanner ?
        props.navigation.navigate("CameraView", { qrValue: qrValue, setQrValue: setQrValue, openScanner: openScanner, setOpenScanner, onBarcodeScan: onBarcodeScan, handleBack: handleBack })
        :
        <View style={{ flex: 1 }}>
          <View style={styles.TitleContainer}>
            <SwitchSelector
              initial={defaultTab}
              onPress={value => handleDropDown(value)}
              textColor={'#014421'}
              selectedColor={'#F9A800'}
              buttonColor={'#014421'}
              hasPadding
              options={options}
            />
          </View>

          {isCreate ?
            <View style={styles.InputContainer}>

              <View style={styles.ChoosePicContainer}>
                <ImageUpload
                  flex={1}
                  picture={picture}
                  setPicture={setPicture}
                  valid={validPicture}
                  setValidPicture={setValidPicture}
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
                  initial={0}
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
                <Pressable
                  style={(validPicture && validLeagueName && validLeagueDesc) ? styles.EnterButtonValid : styles.EnterButtonInvalid}
                  onPress={onSubmit}
                  disabled={!(validPicture && validLeagueName && validLeagueDesc)}
                >
                  <Text style={styles.ChoosePicText}>
                    Submit
                  </Text>
                </Pressable>
              </View>
            </View>
            :
            <View style={styles.InputContainer}>
              <LeagueInvite
                text='Join League'
                // config={config}
                onPress={onOpenScanner}
                qrValue={qrValue}
              />
            </View>
          }
          <View style={styles.SeparatorContainer} />
        </View>
      }
    </View>
  )
}

export default AddLeaguePage;
