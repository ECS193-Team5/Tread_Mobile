import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {InputFormStyle} from "../../css/shared/InputFormStyle";

function Intro(props) {
    const [curStyle, setCurStyle] = useState(InputFormStyle.InitInput)

    const isValid = (text) => {
        if(text.length === 0) {
            return false
        }

        if(!props.multiline && text.length >= 32) {
            return false
        }

        if (props.allowSpecial === null && !(/^[a-z0-9]+$/i.test(text))) {
            return false;
        }

        return true
    }

    const handleTextChange = (text) => {
        // props.setIsChange(true)
        props.setValid(isValid(text));
        props.setValue(text);
    }

    return (
        <View>
            <TextInput
                placeholder = {props.placeholder}
                value={props.value}
                style = {[curStyle, {textAlignVertical: props.multiline ? 'top' : 'center'}]}
                placeholderTextColor = {'#9B9595'}
                editable = {props.editable}
                onChangeText={handleTextChange}
                multiline={props.multiline !== null && props.multiline}
            />
        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//         flex: 1,
//         justifyContent: 'center',
//     },
//     instructions: {
//         color: '#333333',
//         marginBottom: 5,
//         textAlign: 'center',
//     },
//     welcome: {
//         fontSize: 20,
//         margin: 10,
//         textAlign: 'center',
//     },
// });

export default Intro;