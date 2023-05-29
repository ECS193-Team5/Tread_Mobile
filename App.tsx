import React, {useEffect} from 'react';
import {Linking, LogBox, View} from 'react-native';
import Navigator from "./components/navigation/navigator"
import FlashMessage, { showMessage } from 'react-native-flash-message'
import axios from "axios";
import { BACKEND_URL } from '@env';

import { Provider } from 'react-redux';
import { store } from './redux/store';

const sendLeagueRequest = (leagueID) => {
  console.log("send league request");
  var config = {
    method: 'post',
    url: BACKEND_URL + 'league/user_request_to_join',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    data: {
      leagueID: leagueID
    }
  };


  axios(config)
    .then(function (response) {
      console.log("sucessfully sent request");
      showMessage({
        floating : true,
        message : 'Joined League',
        backgroundColor : '#014421',
        color : '#F9A800',
      })
    })
    .catch((error) =>{
      console.log(error);
    }
    )
}

const sendFriendRequest = function(username){
  var config = {
    method: 'post',
    url: BACKEND_URL + 'friend_list/send_friend_request',
    withCredentials: true,
    credentials: 'include',
    headers: {
    Accept: 'application/json',
    },
    data: {
    'friendName' : username,
    }
  };

  axios(config)
  .then(function (response) {
    console.log("sent friend request");
    showMessage({
      floating : true,
      message : 'Sent friend request to ' + username,
      backgroundColor : '#014421',
      color : '#F9A800',
    })
  })
  .catch(function (error) {
    console.log(error)
  })
}

function handleUrl ({ url }) {
  if(url.startsWith("https://tread.run/requestFriend?")){
    let username = url.split("?")[1];
    sendFriendRequest(username);
  }
  if(url.startsWith("https://tread.run/requestLeague?")){
    let leagueID = url.split("?")[1];
    sendLeagueRequest(leagueID);
  }
}
Linking.addEventListener('url', handleUrl)

function App(): JSX.Element {
  LogBox.ignoreAllLogs();
  useEffect(() => {
    // Get the deep link used to open the app
    const getUrl = async () => {
      const universalLink = await Linking.getInitialURL();

      if (universalLink){
        if(universalLink.startsWith("https://tread.run/requestFriend?")){
          let username = universalLink.split("?")[1];
          sendFriendRequest(username);
        }
        if(universalLink.startsWith("https://tread.run/requestLeague?")){
          let leagueID = universalLink.split("?")[1];
          sendLeagueRequest(leagueID);
        }
      }
      console.log(universalLink);
    };

    getUrl();
  });

  return (
    <Provider store = {store}>
      <View style ={{flex:1}}>
        <Navigator/>
        <FlashMessage position = 'top'/>
      </View>
    </Provider>
  );
}

export default App;