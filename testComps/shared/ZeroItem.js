import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

import {ImageStyles} from '../../css/imageCluster/Style'
import {SharedStyles} from '../../css/shared/Style'
function ZeroItem({promptText, SecondaryPrompt, navigateToText, onPress}) {
    return (
        <View>
            <Image style ={ImageStyles.ZeroImage} source={{uri: 'https://imgur.com/q4Uysme.png'}}/>
            <Text style = {SharedStyles.ZeroTextStyle}> {promptText} </Text>
            {SecondaryPrompt !== "" ? <Text style = {SharedStyles.SecondaryPromptStyle}> {SecondaryPrompt} </Text>: <></>}
            {navigateToText !== "" ?
                <TouchableHighlight
                    onPress={onPress}
                    style = {{alignSelf : 'center', marginTop : '2%', borderRadius : 20}}
                    underlayColor = 'rgba(0,0,0,0.15)'
                    testID="test"
                >
                    <Text style = {SharedStyles.NavigatePrompt}> {navigateToText} </Text>
                </TouchableHighlight>
                :
                <></>
            }
        </View>
    )
}

export default ZeroItem