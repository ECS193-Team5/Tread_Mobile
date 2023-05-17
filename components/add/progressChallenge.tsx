import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode("MODAL")
import mappedChallengeList from "./challengeList";
import unitList from "./unitList";
import {styles} from '../../css/add/progress/Style';
import NumericInput from 'react-native-numeric-input'
import DatePicker from 'react-native-date-picker'
import axios from "axios";
import {BACKEND_URL} from '@env';

import {
    View,
    Text,
    TextInput,
    Pressable,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

function ProgressChallenge(): JSX.Element {

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


    useEffect(() => {
        if(value === 'Enter your own') {
            setCustomTextEditable(true);
        } else {
            setCustomTextEditable(false);
            setCustomActivity("");
        }
    }, [value])


    const handleCustomActivityChange = function(activity) {
        setCustomActivity(activity);

        if(activity.length > 0) {
            setValidCustomActivity(true);
        } else {
            setValidCustomActivity(false);
        }
    }

    const handleIssuePress = () => {

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
                setValue(null)
                setValueUnits(null)
                setChallengeAmount(0)
                setStartDate(new Date())
                showMessage({
                  floating : true,
                  message : 'Progress Logged',
                  backgroundColor : '#014421',
                  color : '#F9A800',
                })

            })
            .catch(function (error) {
                console.log(error)
                showMessage({
                  floating : true,
                  message : 'Error logging challenge',
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
                            }}
                            onCancel={() => {
                                setShowStartDatePicker(false)
                            }}
                        />
                        <Text style={styles.DateText}>
                            {startDate.getMonth() + 1} / {startDate.getDate()} / {startDate.getFullYear()}
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
