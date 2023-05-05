import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode("MODAL")
import mappedChallengeList from "./challengeList";
import unitList from "./unitList";
import {styles} from '../../css/add/progress/Style';
import NumericInput from 'react-native-numeric-input'
import DatePicker from 'react-native-date-picker'
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import {BACKEND_URL} from '@env';

import {
    View,
    Button,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TextInput,
    Pressable,
    Modal
} from 'react-native';
import ScaleGestureDetector from "react-native-gesture-handler/lib/typescript/web/detectors/ScaleGestureDetector";
// import units from "react-native-svg/lib/typescript/lib/units";

function ProgressChallenge(): JSX.Element {
    // DropDownPicker.setListMode("SCROLLVIEW")

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(mappedChallengeList);

    const [openUnits, setOpenUnits] = useState(false);
    const [valueUnits, setValueUnits] = useState(null);
    const [itemsUnits, setItemsUnits] = useState(unitList);

    // const [customText, setCustomText] = useState("");
    const [customTextEditable, setCustomTextEditable] = useState(false);

    const [customActivity, setCustomActivity] = useState("");
    const [validCustomActivity, setValidCustomActivity] = useState(true);

    const [challengeAmount, setChallengeAmount] = useState(0);

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date())

    // const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    // const [endDate, setEndDate] = useState(new Date())
    //
    // const [startDateSet, setStartDateSet] = useState(false);

    // const [targetType, setTargetType] = useState("self")
    // const switchOptions = [
    //     {label: 'Self', value: 'self'},
    //     {label: 'Friends', value: 'friend'},
    //     {label: 'League', value: 'league'}
    // ];
    //
    // const friendInfo = [];
    // const leagueInfo: ((prevState: never[]) => never[]) | { label: any; value: any; }[] = [];

    // const [openFriends, setOpenFriends] = useState(false);
    // const [valueFriends, setValueFriends] = useState(null);
    // const [itemsFriends, setItemsFriends] = useState([]);
    //
    // const [openLeagues, setOpenLeagues] = useState(false);
    // const [valueLeagues, setValueLeagues] = useState(null);
    // const [itemsLeagues, setItemsLeagues] = useState([]);

    // useEffect(() => {
    //     // console.log('getting friends')
    //     getFriends()
    //     // console.log('getting leagues')
    //     getLeagues()
    // }, [])

    useEffect(() => {
        if(value === 'Enter your own') {
            setCustomTextEditable(true);
        } else {
            setCustomTextEditable(false);
            setCustomActivity("");
        }
    }, [value])

    // useEffect(() => {
    //     console.log(startDate)
    //     console.log(endDate)
    // }, [])

    // const getFriends = function() {
    //     var config = {
    //         method : 'post',
    //         url : BACKEND_URL + 'friend_list/get_all_friends_info',
    //         headers: {
    //             Accept: 'application/json',
    //         },
    //         withCredentials: true,
    //         credentials: 'include'
    //     };
    //     axios(config)
    //         .then(function(response) {
    //             // console.log(response.data)
    //             response.data.forEach(function(item, index) {
    //                 friendInfo.push({label: item['displayName'], value: item['username']})
    //             })
    //
    //             setItemsFriends(friendInfo)
    //             // console.log(friendInfo)
    //         })
    //         .catch(function(error){
    //             console.log(error)
    //             console.log("No response")
    //         });
    // }

    // const getLeagues = function() {
    //     var config = {
    //         method : 'post',
    //         url : BACKEND_URL + 'league/get_leagues',
    //         headers: {
    //             Accept: 'application/json',
    //         },
    //         withCredentials: true,
    //         credentials: 'include'
    //     };
    //     axios(config)
    //         .then(function(response) {
    //             // console.log(response.data)
    //             response.data.forEach(function(item, index) {
    //                 leagueInfo.push({label: item['leagueName'], value: item['_id']})
    //             })
    //
    //             setItemsLeagues(leagueInfo)
    //             // console.log(leagueInfo)
    //         })
    //         .catch(function(error){
    //             console.log(error)
    //             console.log("No response")
    //         });
    // }

    const handleCustomActivityChange = function(activity) {
        setCustomActivity(activity);

        if(activity.length > 0) {
            setValidCustomActivity(true);
        } else {
            setValidCustomActivity(false);
        }
    }

    const handleIssuePress = () => {
        // let receivedUser = null;
        //
        // if(targetType === 'friend') {
        //     receivedUser = valueFriends;
        // }
        //
        // if(targetType === 'league') {
        //     receivedUser = valueLeagues
        // }
        //
        // console.log(receivedUser)

        const data = {
            loggedDate: startDate.valueOf(),
            // dueDate: endDate.valueOf(),
            unit: valueUnits,
            amount: challengeAmount,
            exerciseName: (customTextEditable ? customActivity : value)
        }

        var config = {
            method: 'post',
            url: BACKEND_URL + 'exercise_log/add',
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
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const validInfo = () => {
        let activitySelected = (value !== null);
        if(customTextEditable) {
            activitySelected = activitySelected && (customActivity.length > 0)
        }

        // console.log(activitySelected)

        let unitSelected = (valueUnits !== null);
        // let validDate = endDate >= startDate;

        // let targetSelected = true;
        //
        // if(targetType === 'friend') {
        //     targetSelected = targetSelected && (valueFriends !== null)
        // }
        //
        // if(targetType === 'league') {
        //     targetSelected = targetSelected && (valueLeagues !== null)
        // }

        return activitySelected && unitSelected;
    }

    return (
        <View style={styles.ChallengeContainer}>
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
                            style = {validCustomActivity ? styles.validInput : styles.invalidInput}
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
                            // containerStyle={{width: '50%'}}
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
                            maximumDate={new Date()}
                            onConfirm={(date) => {
                                setShowStartDatePicker(false)
                                console.log(date)
                                setStartDate(date)
                                // setStartDateSet(true)
                            }}
                            onCancel={() => {
                                setShowStartDatePicker(false)
                            }}
                        />
                        <Text style={styles.DateText}>
                            {startDate.getMonth()} / {startDate.getDate()} / {startDate.getFullYear()}
                        </Text>
                    </Pressable>


                </View>


            </View>

            <View style = {styles.SubmitContainer}>
                <Pressable
                    style={validInfo() ? styles.EnterButtonValid : styles.EnterButtonInvalid}
                    onPress={handleIssuePress}
                    disabled={!validInfo()}
                >
                    <Text style={styles.IssueChallengeText}>
                        Submit
                    </Text>
                </Pressable>

            </View>


        </View>
    )
}

export default ProgressChallenge;
