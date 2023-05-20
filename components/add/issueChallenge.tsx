import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode("MODAL")
import mappedChallengeList from "./challengeList";
import unitList from "./unitList";
import {styles} from '../../css/add/challenge/Style';
import NumericInput from 'react-native-numeric-input'
import DatePicker from 'react-native-date-picker'
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import {showMessage} from 'react-native-flash-message'
import {BACKEND_URL} from '@env';

import Ionicons                 from 'react-native-vector-icons/Ionicons'
import AntDesign                from 'react-native-vector-icons/AntDesign'
import Entypo                   from 'react-native-vector-icons/Entypo'
import Feather                  from 'react-native-vector-icons/Feather'
import FontAwesome              from 'react-native-vector-icons/FontAwesome'
import FontAwesome5             from 'react-native-vector-icons/FontAwesome5Pro'
import Fontisto                 from 'react-native-vector-icons/Fontisto'
import Foundation               from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons   from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons            from 'react-native-vector-icons/MaterialIcons'
import Octicons                 from 'react-native-vector-icons/Octicons'
import SimpleLineIcons          from 'react-native-vector-icons/SimpleLineIcons'
import Zocial                   from 'react-native-vector-icons/Zocial'

Ionicons.loadFont()            
AntDesign.loadFont()                       
Entypo.loadFont()                          
Feather.loadFont()                         
FontAwesome.loadFont()                     
// FontAwesome5.loadFont()                    
Fontisto.loadFont()                        
Foundation.loadFont()                      
MaterialCommunityIcons.loadFont()          
MaterialIcons.loadFont()                   
Octicons.loadFont()                        
SimpleLineIcons.loadFont()                 
Zocial.loadFont()                          

import {
    View,
    Text,
    TextInput,
    Pressable,
    TouchableHighlight,
} from 'react-native';

function IssueChallenge({fromLeague, id}): JSX.Element {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(mappedChallengeList);

    const [openUnits, setOpenUnits] = useState(false);
    const [valueUnits, setValueUnits] = useState(null);
    const [itemsUnits, setItemsUnits] = useState(unitList);

    const [customTextEditable, setCustomTextEditable] = useState(false);

    const [customActivity, setCustomActivity] = useState("");
    const [validCustomActivity, setValidCustomActivity] = useState(true);

    const [challengeAmount, setChallengeAmount] = useState(0);

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date())

    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [endDate, setEndDate] = useState(new Date())
    endDate.setDate(startDate.getDate() + 1)

    const [startDateSet, setStartDateSet] = useState(false);
    const [targetType, setTargetType] = useState(fromLeague === true ? "league" : "self")

    const switchOptions = [
        {label: 'Self', value: 'self'},
        {label: 'Friends', value: 'friend'},
        {label: 'League', value: 'league'}
    ];

    const friendInfo = [];
    const leagueInfo: ((prevState: never[]) => never[]) | { label: any; value: any; }[] = [];

    const [openFriends, setOpenFriends] = useState(false);
    const [valueFriends, setValueFriends] = useState(null);
    const [itemsFriends, setItemsFriends] = useState([]);

    const [openLeagues, setOpenLeagues] = useState(false);
    const [valueLeagues, setValueLeagues] = useState(fromLeague === true ? id : null);
    const [itemsLeagues, setItemsLeagues] = useState([]);

    useEffect(() => {
        getFriends()
        getLeagues()
    }, [])

    useEffect(() => {
        if(value === 'Enter your own') {
            setCustomTextEditable(true);
        } else {
            setCustomTextEditable(false);
            setCustomActivity("");
        }
    }, [value])

    const getFriends = function() {
        var config = {
            method : 'post',
            url : BACKEND_URL + 'friend_list/get_all_friends_info',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include'
        };
        axios(config)
            .then(function(response) {
                response.data.forEach(function(item, index) {
                    friendInfo.push({label: item['displayName'], value: item['username']})
                })

                setItemsFriends(friendInfo)
            })
            .catch(function(error){
                console.log(error)
                console.log("No response")
            });
    }

    const getLeagues = function() {
        var config = {
            method : 'post',
            url : BACKEND_URL + 'league/get_leagues',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include'
        };
        axios(config)
            .then(function(response) {
                response.data.forEach(function(item, index) {
                    leagueInfo.push({label: item['leagueName'], value: item['_id']})
                })

                setItemsLeagues(leagueInfo)
            })
            .catch(function(error){
                console.log(error)
                console.log("No response")
            });
    }

    const handleCustomActivityChange = function(activity) {
        setCustomActivity(activity);

        if(activity.length > 0) {
            setValidCustomActivity(true);
        } else {
            setValidCustomActivity(false);
        }
    }

    const handleIssuePress = () => {
        let receivedUser = null;

        if(targetType === 'friend') {
            receivedUser = valueFriends;
        }

        if(targetType === 'league') {
            receivedUser = valueLeagues
        }

        console.log(receivedUser)

        const data = {
            receivedUser: receivedUser,
            issueDate: startDate.valueOf(),
            dueDate: endDate.valueOf(),
            unit: valueUnits,
            amount: challengeAmount,
            exerciseName: (customTextEditable ? customActivity : value)
        }

        var config = {
            method: 'post',
            url: BACKEND_URL + "challenges/add_" + targetType + "_challenge",
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data)
                setValue(null)
                setValueUnits(null)
                setChallengeAmount(0)
                setStartDate(new Date())
                setEndDate(new Date())
                setValueLeagues(null)
                setValueFriends(null)
                showMessage({
                  floating : true,
                  message : 'Challenge Created',
                  backgroundColor : '#014421',
                  color : '#F9A800',
                })
            })
            .catch(function (error) {
                console.log(error)
                showMessage({
                  floating : true,
                  message : 'Error creating challenge',
                  type : 'danger',
                })
            })
    }

    const validInfo = () => {
        let activitySelected = (value !== null);
        if(customTextEditable) {
            activitySelected = activitySelected && (customActivity.length > 0)
        }

        let unitSelected = (valueUnits !== null);
        let validDate = endDate >= startDate;
        let validAmount = challengeAmount > 0
        let targetSelected = true;

        if(targetType === 'friend') {
            targetSelected = targetSelected && (valueFriends !== null)
        }

        if(targetType === 'league') {
            targetSelected = targetSelected && (valueLeagues !== null)
        }

        return activitySelected && unitSelected && validDate && targetSelected && validAmount;
    }

    const [showRecommendMessage, setShowRecommendMessage] = useState(false)
    const handleRecommendPress = function(){
      console.log('pressed Recommend')
      setShowRecommendMessage(true)
    }

    return (
      <View style = {styles.ChallengeContainer} >
            <View style = {styles.RecommendChallengeContainer}>
              <TouchableHighlight
                    style={styles.RecommendButton}
                    onPress={handleRecommendPress}
                    underlayColor = '#013319'
                    >
                    <Text style={styles.IssueChallengeText}>
                        Recommend Challenge
                    </Text>
              </TouchableHighlight>
            </View>
            {showRecommendMessage ? 
              <View style = {styles.RecommendTextContainer}>
                <Text style={styles.RecommendMessageText}>
                    Message Text
                </Text>
              </View>
              :
              null
            }

            <View style={styles.ChallengeDropContainer}>
                <Text style={styles.ActivityTitle}>
                    Activity
                </Text>
                <DropDownPicker
                    setValue={setValue}
                    value={value}
                    items={items}
                    open={open}
                    setOpen={setOpen}
                    placeholder={'Choose an activity'}
                >
                </DropDownPicker>
            </View>

            {customTextEditable &&
                <View style={styles.CustomChalContainer}>
                    <View style={styles.EnterOwnContainer}>

                        <TextInput
                            placeholder={"Enter custom activity"}
                            placeholderTextColor={validCustomActivity ? 'grey' : '#C65656'}
                            style = {validCustomActivity ? [styles.validInput , {height : '100%'}] : [styles.invalidInput, {height : '100%'}]}
                            editable={customTextEditable}
                            value={customActivity}
                            onChangeText={handleCustomActivityChange}
                        >
                        </TextInput>
                    </View>
                </View>

            }

            <View style={styles.ChallengeAmountContainer}>
                <Text style={styles.ActivityTitle}>
                    Amount
                </Text>

                <View style={styles.EnterChallengeAmount}>
                    <View style={styles.NumericInput}>
                        <NumericInput
                            onChange={setChallengeAmount}
                            value={challengeAmount}
                            minValue={0}
                            rounded={true}
                            inputStyle={{borderColor: '#014421'}}
                            iconStyle={{color: 'white'}}
                            textColor="black"
                            rightButtonBackgroundColor="#014421"
                            leftButtonBackgroundColor="#014421"
                        />
                    </View>

                    <View style={styles.UnitDropdown}>
                        <DropDownPicker
                            setValue={setValueUnits}
                            value={valueUnits}
                            items={itemsUnits}
                            open={openUnits}
                            setOpen={setOpenUnits}
                            placeholder={'Units'}
                        >
                        </DropDownPicker>

                    </View>

                </View>

            </View>
            <View style = {styles.CompletionDataContainer}>
                <Text style={styles.ActivityTitle}>
                    Completion Date
                </Text>
                <View style = {styles.CalendarButtonContainer}>
                    <Pressable
                        style={styles.StartButton}
                        onPress={() => {setShowStartDatePicker(true)}}
                    >
                        <DatePicker
                            modal = {true}
                            mode = {'date'}
                            open={showStartDatePicker}
                            date={startDate}
                            minimumDate = {new Date()}
                            onConfirm={(date) => {
                                setShowStartDatePicker(false)
                                console.log(date)
                                setStartDate(date)
                                setStartDateSet(true)
                            }}
                            onCancel={() => {
                                setShowStartDatePicker(false)
                            }}
                        />
                        <Text style={styles.DateText}>
                            {startDate.getMonth() + 1} / {startDate.getDate()} / {startDate.getFullYear()}
                        </Text>
                    </Pressable>
                    <View style={styles.ToTextContainer}>
                        <Text style={styles.ToText}>
                            to
                        </Text>
                    </View>
                    <Pressable
                        style={styles.EndButton}
                        onPress={() => {setShowEndDatePicker(true)}}
                    >
                        <DatePicker
                            modal = {true}
                            mode = {'date'}
                            open={showEndDatePicker}
                            minimumDate={endDate}
                            date={endDate}
                            onConfirm={(date) => {
                                setShowEndDatePicker(false)
                                setEndDate(date)
                            }}
                            onCancel={() => {
                                setShowEndDatePicker(false)
                            }}
                        />

                        <Text style={styles.DateText}>
                            {endDate.getMonth() + 1} / {endDate.getDate()} / {endDate.getFullYear()}
                        </Text>
                    </Pressable>

                </View>


            </View>
            <View style = {styles.IssueToContainer}>
              <Text style={styles.ActivityTitle}>
                  Issue To
              </Text>
              <View style={styles.PickIssueTarget}>
                  <SwitchSelector
                      options = {switchOptions}
                      initial = {fromLeague === true ? 2 : 0}
                      selectedColor = '#F9A800'
                      textColor = '#014421'
                      buttonColor = '#014421'
                      borderColor = '#014421'
                      onPress = {setTargetType}
                      hasPadding = {true}
                  >
                  </SwitchSelector>
              </View>
            </View>

            {targetType === "friend" &&
                <View style = {styles.DropDownContainer}>
                <View style={styles.SelectTarget}>
                    <DropDownPicker
                        setValue={setValueFriends}
                        value={valueFriends}
                        items={itemsFriends}
                        open={openFriends}
                        setOpen={setOpenFriends}
                        placeholder={'Choose friend'}
                    >
                    </DropDownPicker>
                </View>
              </View>
            }

            {targetType === "league" &&
                <View style = {styles.DropDownContainer}>
                  <View style={styles.SelectTarget}>
                      <DropDownPicker
                          setValue={setValueLeagues}
                          value={valueLeagues}
                          items={itemsLeagues}
                          open={openLeagues}
                          setOpen={setOpenLeagues}
                          placeholder={'Choose a league'}
                      >
                      </DropDownPicker>
                  </View>
                </View>
            }
            <View style = {styles.SubmitContainer}>
                <TouchableHighlight
                    style={validInfo() ? styles.EnterButtonValid : styles.EnterButtonInvalid}
                    onPress={handleIssuePress}
                    disabled={!validInfo()}
                    underlayColor = '#013319'
                >
                    <Text style={styles.IssueChallengeText}>
                        Issue
                    </Text>
                </TouchableHighlight>
            </View>
      </View>
    )
}

export default IssueChallenge;
