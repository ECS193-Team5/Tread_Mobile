import React from 'react';
import {
    Image,
    View
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import { ImageStyles } from '../../css/imageCluster/Style';

function MedalImage({level}): JSX.Element{
    const imageGold = 'https://i.imgur.com/o2XvWn9.png';
    const imageSilver = 'https://i.imgur.com/72N0DMU.png';
    const imageBronze = 'https://i.imgur.com/iCqnM41.png';
    var imageUrl = 'https://imgur.com/a/5IVD5Ew';

    if(level === 3) {
        imageUrl = imageGold
    } else if(level === 2) {
        imageUrl = imageSilver
    } else if(level === 1) {
        imageUrl = imageBronze
    }

    return(
        <View style = {cardStyles.ImageContainer}>
            <Image style ={ImageStyles.medal} source={{uri: imageUrl}}/>
        </View>
    )
}

export default MedalImage;