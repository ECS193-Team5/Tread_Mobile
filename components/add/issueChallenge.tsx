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
    ScrollView
} from 'react-native';

function IssueChallenge(): JSX.Element {
    // DropDownPicker.setListMode("SCROLLVIEW")

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(mappedChallengeList);

    // console.log(items);

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
        </View>
    )
}

export default IssueChallenge;
