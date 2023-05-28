import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import ProgressCircle from "progress-circle-react-native"
import ImageCluster from '../shared/ImageCluster';
import MedalImage from "./medalImage";
function MedalCard({MedalData}): JSX.Element {
    const [modalVisible, setModalVisible] = useState(false)
    // var images = []
    var currentAmount = MedalData['progress'];
    var targetAmount = MedalData['exercise']['convertedAmount'];
    var ProgressPercent = Math.min(100,Math.round(currentAmount / targetAmount * 100))

    return (
        <View style = {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}>
            <StatusBar
                barStyle="dark-content"
            />

            <MedalImage
                level = {MedalData['level']}
            />

            <View style = {cardStyles.seperator}/>

            <View style = {cardStyles.ChallengeCardTextContainer}>
                <View style = {cardStyles.ChallengeNameContainer}>
                    <Text style = {cardStyles.MedalNameText}>
                        {MedalData['exercise']['exerciseName'] + " " + MedalData['exercise']['amount'] + " " + MedalData['exercise']['unit']}
                    </Text>
                </View>
                <View style = {cardStyles.ChallengeProgressContainer}>
                    <ProgressCircle
                        percent = {ProgressPercent}
                        radius = {35}
                        borderWidth = {3}
                        color = '#014421'
                        shadowColor='#bebebe'
                        bgColor='#FFFFFF'
                    >
                        <Text style = {cardStyles.MedalProgressText}>{ProgressPercent + "%"}</Text>
                    </ProgressCircle>
                </View>
            </View>
        </View>
    )
}

export default MedalCard;