import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  StatusBar,
  UIManager,
  LayoutAnimation,
  Keyboard,
  TouchableHighlight,
  AppState,
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
import { SharedStyles } from '../../css/shared/Style';
import LeagueInviteScroll from '../../components/shared/LeagueInviteScroll';
import ZeroItem from '../../components/shared/ZeroItem';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useFocusEffect } from '@react-navigation/native';

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
        showMessage({
          floating : true,
          message : 'Joined League',
          backgroundColor : '#014421',
          color : '#F9A800',
        })
      })
      .catch((error) =>{
        console.log(error);
        setQrValue("Already joined this league")
        showMessage({
          floating : true,
          message : 'Already in this League',
          backgroundColor : '#014421',
          color : '#F9A800',
        })
      }
      )
  }

  const onBarcodeScan = function (qrvalue) {
    if(qrvalue.startsWith("https://tread.run/requestLeague?")){
      qrvalue = qrvalue.split("?")[1];
      sendLeagueRequest(qrvalue);
    } else {
      showMessage({
        floating : true,
        message : 'Error sending invite',
        type : 'danger',
      })
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

  const getCreateCode = function(){
    return (
      <GestureRecognizer
      onSwipeDown = {() => Keyboard.dismiss()}
      style ={{flex : 1}}
      >
        <View style={styles.InputContainer}>
          <View style={styles.ChoosePicContainer}>
            <ImageUpload
              flex={1}
              picture={picture}
              setPicture={setPicture}
              valid={validPicture}
              setValidPicture={setValidPicture}
              placeholder='https://imgur.com/a/5IVD5Ew'
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
            <TouchableHighlight
              style={(validPicture && validLeagueName && validLeagueDesc) ? styles.EnterButtonValid : styles.EnterButtonInvalid}
              onPress={onSubmit}
              underlayColor = '#013319'
              disabled={!(validPicture && validLeagueName && validLeagueDesc)}
            >
              <Text style={styles.ChoosePicText}>
                Submit
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.SeparatorContainer} />
      </GestureRecognizer>
    )
  }

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const layoutAnimConfig = {
    duration: 1000,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 200,
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  function getReccLeagues() {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_recommended',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data)
        setSuggestedLeagues(response.data)
        setCount(response.data.length)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const handleRefresh = function(){
    getReccLeagues()
  }

  useFocusEffect(
    React.useCallback(() => {
      getReccLeagues()
    }, [])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleRefresh)
    return () => {
      subscription.remove()
    }
  }, [])

  const deleteItem = function(lData) {
    console.log(lData._id)
    console.log("deleted")
    const filteredData = suggestedLeagues.filter(item => item._id !== lData._id);
    setSuggestedLeagues(filteredData)
    filteredData.length === 0 ? setCount(0) : null
    LayoutAnimation.configureNext(layoutAnimConfig)
  }

  const [suggestedLeagues, setSuggestedLeagues] = useState(getReccLeagues);
  const [count, setCount] = useState(0);

  const getJoinCode = function(){
    return(
      <View style ={{flex : 1}}>
        <View style={styles.InputContainer}>
          <LeagueInvite
            text='Join League'
            onPress={onOpenScanner}
            qrValue={qrValue}
          />
        </View>
        <View style={styles.SuggestedSeparatorContainer}>
          <View style = {[SharedStyles.seperator, {marginTop : '0%'}]}/>
          <View style = {styles.SuggestedTitleContainer}>
            <Text style = {styles.Title}>
                Suggested Leagues
            </Text>
          </View>
          <View style = {styles.SuggestedLeagueContainer}>
          {count > 0 ?
            <LeagueInviteScroll
              LeagueData={suggestedLeagues}
              handler={deleteItem}
              onRefresh={handleRefresh}
              pageTitle='suggested'
            />
            :
            <ZeroItem
              promptText={'No recommended leagues yet'}
              SecondaryPrompt = 'We suggest leagues based on your activity'
              navigateToText='Start Logging Here'
              navigateToPage='AddChallenge'
              defaultView={false}
              fromLeague = {false}
              props = {props}
            />
          }
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.Background}>
      <StatusBar
        barStyle="dark-content"
      />

      {openScanner ?
        props.navigation.navigate("CameraView", { qrValue: qrValue, setQrValue: setQrValue, openScanner: openScanner,
          setOpenScanner, onBarcodeScan: onBarcodeScan, handleBack: handleBack })
        :
        <View style={{ flex: 1 }}>
          <View style={styles.TitleContainer}>
            <SwitchSelector
              initial={defaultTab ? 1: 0}
              onPress={value => handleDropDown(value)}
              textColor={'#014421'}
              selectedColor={'#F9A800'}
              buttonColor={'#014421'}
              hasPadding
              options={options}
            />
          </View>

          {isCreate ? getCreateCode() : getJoinCode() }
        </View>
      }
    </View>
  )
}

export default AddLeaguePage;
