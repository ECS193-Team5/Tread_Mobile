import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList, RefreshControl
} from 'react-native';

import {styles} from "../../css/challenges/Style"
import MedalCard from "./medalCard";
function MedalScroll({MedalData, onRefresh}): JSX.Element {
    const [refreshing, setRefreshing] = useState(false)

    const renderProfile = ({item}) => {
        return (
            <MedalCard
                MedalData = {item}
            ></MedalCard>
        )
    }

    const Refresh = function() {
        setRefreshing(true);
        setTimeout(() => {
            onRefresh()
            setRefreshing(false);
        }, 450);
    }

    return (
        <FlatList
            data = {MedalData}
            renderItem = {renderProfile}
            contentContainerStyle = {styles.FlatListContainer}
            refreshControl ={
                <RefreshControl
                    refreshing = {refreshing}
                    onRefresh = {Refresh}
                    colors = {['#014421']}
                    tintColor = {'#014421'}
                    progressViewOffset = {-10}
                />
            }
            testID = "Profile Scroll"
        />
    )
}

export default MedalScroll