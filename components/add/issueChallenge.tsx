import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setListMode("MODAL")
import mappedChallengeList from "./challengeList";
import {styles} from '../../css/add/challenge/Style';

import {
    View,
    Button,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TextInput
} from 'react-native';

function IssueChallenge(): JSX.Element {
    // DropDownPicker.setListMode("SCROLLVIEW")

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(mappedChallengeList);

    const [customText, setCustomText] = useState("");
    const [customTextEditable, setCustomTextEditable] = useState(false);

    const [customActivity, setCustomActivity] = useState("");
    const [validCustomActivity, setValidCustomActivity] = useState(true);

    useEffect(() => {
        if(value === 'Enter your own') {
            setCustomTextEditable(true);
        } else {
            setCustomTextEditable(false);
            setCustomActivity("");
        }
    }, [value])

    console.log(value);
    console.log(customActivity);

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

            </View>
            <View style = {styles.CompletionDataContainer}>

            </View>
            <View style = {styles.IssueToContainer}>

            </View>
            <View style = {styles.SubmitContainer}>

            </View>



        </View>
    )
}

export default IssueChallenge;
