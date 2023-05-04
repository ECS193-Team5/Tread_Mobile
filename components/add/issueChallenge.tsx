import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode("MODAL")
import mappedChallengeList from "./challengeList";
import unitList from "./unitList";
import {styles} from '../../css/add/challenge/Style';
import NumericInput from 'react-native-numeric-input'
import DatePicker from 'react-native-date-picker'

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

function IssueChallenge(): JSX.Element {
    // DropDownPicker.setListMode("SCROLLVIEW")

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(mappedChallengeList);

    const [openUnits, setOpenUnits] = useState(false);
    const [valueUnits, setValueUnits] = useState(null);
    const [itemsUnits, setItemsUnits] = useState(unitList);

    const [customText, setCustomText] = useState("");
    const [customTextEditable, setCustomTextEditable] = useState(false);

    const [customActivity, setCustomActivity] = useState("");
    const [validCustomActivity, setValidCustomActivity] = useState(true);

    const [challengeAmount, setChallengeAmount] = useState(0);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date())

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

                {customTextEditable &&
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
                }

            </View>
            <View style={styles.ChallengeAmountContainer}>
                <Text style={styles.ActivityTitle}>
                    Activity
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
                <Pressable
                    style={styles.CalendarButtonContainer}
                    onPress = {() => {setShowDatePicker(true)}}
                >
                    <Image
                        src = {'https://i.imgur.com/is304Gd.png'}
                        style = {styles.CalendarImageIcon}
                    >
                    </Image>
                </Pressable>
                <DatePicker
                    modal = {true}
                    mode = {'date'}
                    open={showDatePicker}
                    date={date}
                    onConfirm={(date) => {
                        setShowDatePicker(false)
                        console.log(date)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setShowDatePicker(false)
                    }}
                />

            </View>
            <View style = {styles.IssueToContainer}>

            </View>
            <View style = {styles.SubmitContainer}>

            </View>

            {/*<Modal*/}
            {/*    visible = {showDatePicker}*/}
            {/*    transparent={true}*/}
            {/*>*/}
            {/*    <View style={styles.CalendarPickerModal}>*/}
            {/*        <DateRangePicker*/}
            {/*            onChange = {handleDateChange}*/}
            {/*            startDate = {null}*/}
            {/*            endDate = {null}*/}
            {/*            range = {true}*/}
            {/*            displayedDate = {displayedDate}*/}
            {/*            open = {showDatePicker}*/}
            {/*            selectedStyle = {{*/}
            {/*                backgroundColor: 'blue'*/}
            {/*            }}*/}
            {/*            // presetButtons = {true}*/}
            {/*        >*/}

            {/*        </DateRangePicker>*/}
            {/*    </View>*/}
            {/*</Modal>*/}

        </View>
    )
}

export default IssueChallenge;
