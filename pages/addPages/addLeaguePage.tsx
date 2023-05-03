import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';

import {styles} from '../../css/add/league/Style';

import {launchImageLibrary} from 'react-native-image-picker';
import SwitchSelector from "react-native-switch-selector";

import {BACKEND_URL} from '@env';
import axios from 'axios';
import LeagueInvite from '../../components/shared/LeagueInvite';

const options = [
  { label : "Create" , value : true},
  { label : "Join", value : false}
]

function AddLeaguePage(props): JSX.Element {
  const [qrValue, setQrValue] = useState('')
  const [openScanner, setOpenScanner] = useState(false)
  const [defaultTab ,setDefaultTab] = useState(0)

  
  const onBarcodeScan = function(qrvalue) {
    setQrValue(qrvalue)
    setOpenScanner(false)
    props.navigation.navigate("AddLeague")
  }

  const handleBack = function(qrValue) {
    setDefaultTab(1)
    setOpenScanner(false)
    props.navigation.navigate("AddLeague")
  }

  const onOpenScanner = function() {
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

	const [picture, setPicture] = useState({});
	const [validPicture, setValidPicture] = useState(false);

	const [leagueName, setLeagueName] = useState("");
	const [validLeagueName, setValidLeagueName] = useState(false);

	const [leagueDesc, setLeagueDesc] = useState("");
	const [validLeagueDesc, setValidLeagueDesc] = useState(false);

	const [security, setSecurity] = useState("private");

  const [isCreate, setIsCreate] = useState(true)

	const switchOptions = [
		{label: 'Private', value: 'private'},
		{label: 'Public', value: 'public'}
	];

	const onChoosePicPress = function() {
		const options = {
			'includeBase64': true,
			'maxWidth': 200,
			'maxHeight': 200
		}

		launchImageLibrary(options, (response) => {
		  if(!response['didCancel']) {
			console.log('Picture Chosen');
			const source = response['assets'][0]["base64"];
			setPicture("data:image/jpeg;base64," + source)
			setValidPicture(true);
		  }
		});
	}

	const onLeagueNameChange = function(name) {
		console.log('Name changed');
		setLeagueName(name);
		if(checkValidLeagueName(name)) {
			setValidLeagueName(true);
		} else {
			setValidLeagueName(false);
		}
	}

	const onLeagueDescChange = function(desc) {
		setLeagueDesc(desc);
		if(checkValidLeagueDesc(desc)) {
			setValidLeagueDesc(true);
		} else {
			setValidLeagueDesc(false);
		}
	}

	const checkValidLeagueName = function(name) {
		return name.length > 0
	}

	const checkValidLeagueDesc = function(desc) {
		return desc.length > 0
	}

  const handleDropDown = function(selectedItem){
    console.log(selectedItem)
    setIsCreate(selectedItem)
  }

	const onSubmit = function() {
		var config = {
			method: 'post',
			url: BACKEND_URL + 'league/create_league',
			withCredentials: true,
			credentials: 'include',
			headers: {
				Accept: 'application/json',
			},
			data: {
				'leagueName': leagueName,
				'leagueDescription': leagueDesc,
				'leagueType': security,
				'leaguePicture': picture
			}
		};

		axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
			setPicture("");
			setLeagueName("");
			setLeagueDesc("");
		})
		.catch(function (error) {
			console.log(error);
		});
	}

  return (
		<View style = {styles.Background}>
      <StatusBar
        barStyle="dark-content"
      />
      
      {openScanner ?
      props.navigation.navigate("CameraView", {qrValue : qrValue, setQrValue : setQrValue, openScanner : openScanner, setOpenScanner, onBarcodeScan : onBarcodeScan, handleBack : handleBack})
      :
      <View style = {{flex:1}}>
        <View style = {styles.TitleContainer}>
          <SwitchSelector
              initial= {defaultTab}
              onPress = {value => handleDropDown(value)}
              textColor = {'#014421'}
              selectedColor = {'#F9A800'}
              buttonColor = {'#014421'}
              hasPadding
              options = {options}
            />
        </View>
        
        {isCreate ? 
          <View style = {styles.InputContainer}>
            <View style = {styles.InputTitle}>
              <Text style = {styles.InputTitleText}>
                Picture
              </Text>
            </View>

            <View style = {styles.ChoosePicContainer}>
              <Pressable style = {styles.ChoosePicButton} onPress = {onChoosePicPress}>
                <Text style = {styles.ChoosePicText}>
                  Choose Picture
                </Text>
              </Pressable>
            </View>

            <View style = {styles.InputTitle}>
              <Text style = {styles.InputTitleText}>
                Name
              </Text>
            </View>

            <View style = {styles.EnterLeagueContainer}>
              <TextInput
                placeholder = "Enter league name"
                placeholderTextColor= "grey"
                style = {styles.NameInput}
                onChangeText = {onLeagueNameChange}
                value = {leagueName}
              >
              </TextInput>
            </View>

            <View style = {styles.InputTitle}>
              <Text style = {styles.InputTitleText}>
                Description
              </Text>
            </View>

            <View style = {styles.EnterDescContainer}>
              <TextInput
                placeholder = "Enter league description"
                placeholderTextColor= "grey"
                style = {styles.DescInput}
                onChangeText = {onLeagueDescChange}
                value = {leagueDesc}
                multiline = {true}
              >
              </TextInput>
            </View>

            <View style = {styles.InputTitle}>
              <Text style = {styles.InputTitleText}>
                Security
              </Text>
            </View>

            <View style = {styles.ChooseSecContainer}>
              <SwitchSelector
                options = {switchOptions}
                initial = {0}
                selectedColor = 'white'
                textColor = '#014421'
                buttonColor = '#014421'
                borderColor = '#014421'
                onPress = {setSecurity}
                hasPadding = {true}
              >
              </SwitchSelector>
            </View>

            <View style = {styles.EnterButtonContainer}>
              <Pressable
                style = {(validPicture && validLeagueName && validLeagueDesc) ? styles.EnterButtonValid : styles.EnterButtonInvalid}
                onPress = {onSubmit}
                disabled = {!(validPicture && validLeagueName && validLeagueDesc)}
                >
                <Text style = {styles.ChoosePicText}>
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        :
          <View style = {styles.InputContainer}>
            <LeagueInvite
              text = 'Join League'
              // config={config}
              onPress = {onOpenScanner}
              qrValue = {qrValue}
            />
          </View>
        }
      <View style = {styles.SeparatorContainer}/>
      </View>
      }
		  </View>
  )
}

export default AddLeaguePage;
