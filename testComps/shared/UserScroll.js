import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
} from 'react-native';

import UserCard from "./UserCard";


function UserScroll({UserData, onRefresh}) {
    const [refreshing, setRefreshing] = useState(false)
    // const Refresh = function() {
    //     setRefreshing(true);
    //     setTimeout(() => {
    //         onRefresh()
    //         setRefreshing(false);
    //     }, 450);
    // }

    const renderUser = ({item, index}) => {
        return (
            <UserCard/>
        )
    }

    return (
        <FlatList
            data = {UserData}
            renderItem = {renderUser}
            refreshControl ={
                <RefreshControl
                    refreshing = {refreshing}
                    onRefresh = {onRefresh}
                    colors = {['#014421']}
                    tintColor = {'#014421'}
                    progressViewOffset = {-10}
                />
            }
        />
    )
}

export default UserScroll