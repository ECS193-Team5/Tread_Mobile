import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode("MODAL")
import mappedChallengeList, { challengeList }  from "./challengeList";
import unitList from "./unitList";
import {styles} from '../../css/add/challenge/Style';
import NumericInput from './numericInput';
import DatePicker from 'react-native-date-picker'
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import {showMessage} from 'react-native-flash-message'
import {BACKEND_URL} from '@env';
import RecommendChallenge from './recommendChallenge';

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
    let minDate = null;

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date())

    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [endDate, setEndDate] = useState(new Date())
    const [minEndDate, setMinEndDate] = useState(new Date())
    minEndDate.setDate(startDate.getDate() + 1)

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

    const [load, setLoad] = useState(false)

    useEffect(() => {
      if(!load){
        setLoad(true)
        endDate.setDate(new Date().getDate() + 1)
      }

    }, [load])


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
                setValue(null)
                setValueUnits(null)
                setChallengeAmount(Number(0))
                setStartDate(new Date())
                setEndDate(new Date())
                minEndDate.setDate(startDate.getDate() + 1)
                setLoad(false)
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

    const updateInputs = function(data){
      if (data === 'NA'){
        return;
      }

      if(challengeList.includes(data.exerciseName)){
        setCustomTextEditable(false);
        setValue(data.exerciseName)
      }
      else{
        setCustomTextEditable(true);
        setValue("Enter your own")
        setCustomActivity(data.exerciseName);
      }

      setValueUnits(data.unit)
      setStartDate(data.issueDate)
      setEndDate(data.dueDate)
      setChallengeAmount(data.amount)
    }

    const [RecMessage, setRecMessage] = useState("")

    return (
      <View style = {styles.ChallengeContainer} >
            <RecommendChallenge
              updateInputs={updateInputs}
              setRecMessage = {setRecMessage}
            />
              <View style = {[styles.RecommendTextContainer]}>
                <Text style={styles.RecommendMessageText}>
                    {RecMessage}
                </Text>
              </View>

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
                            initValue = {challengeAmount}
                            minValue={0}
                            rounded={true}
                            inputStyle={{borderColor: '#014421'}}
                            iconStyle={{color: '#F9A800', fontWeight:'bold', fontSize:30}}
                            textColor="black"
                            backgroundColor =  "black"
                            rightButtonBackgroundColor='#014421'
                            leftButtonBackgroundColor='#014221'
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
                            minimumDate = {new Date(new Date().setHours(0,0,0))}
                            onConfirm={(date) => {

                                setStartDate(date)
                                setStartDateSet(true)

                                if(date.getDate() >= endDate.getDate() && date.getMonth() >= date.getMonth() && date.getFullYear() >= date.getFullYear()) {
                                  endDate.setDate(date.getDate() + 1)
                                }
                                minEndDate.setDate(date.getDate() + 1)
                                setShowStartDatePicker(false)
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
                            minimumDate={minEndDate}
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
                    testID={validInfo() ? "Valid Send" : "Invalid Send"}
                    onPress={handleIssuePress}
                    disabled={!validInfo()}
                    underlayColor = '#013319'
                >
                    <Text style={styles.IssueChallengeText}>
                        Send
                    </Text>
                </TouchableHighlight>
            </View>
      </View>
    )
}

export default IssueChallenge;
