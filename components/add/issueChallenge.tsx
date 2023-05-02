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

    useEffect(() => {
        if(value === 'Enter your own') {
            setCustomTextEditable(true);
        } else {
            setCustomTextEditable(false);
        }
    }, [value])

    return (
        <View style={styles.ChallengeContainer}>
            <View style={styles.ChallengeDropContainer}>
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
                <View style={styles.EnterOwnContainer}>

                    <TextInput
                        placeholder={"Enter custom activity"}
                        placeholderTextColor='grey'
                        style = {styles.validInput}
                        editable={customTextEditable}
                    >
                    </TextInput>
                </View>
            }
        </View>
    )
}

export default IssueChallenge;
