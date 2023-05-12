import React, {useEffect} from 'react';
import {Linking, LogBox, View} from 'react-native';
import Navigator from "./components/navigation/navigator"
import FlashMessage from 'react-native-flash-message'

function handleUrl ({ url }) {
  console.log(url); 
}
Linking.addEventListener('url', handleUrl)

function App(): JSX.Element {
  LogBox.ignoreAllLogs();
  useEffect(() => {
    // Get the deep link used to open the app
    const getUrl = async () => {
      const universalLink = await Linking.getInitialURL();
      //handle universal link
    };

    getUrl();
  });

  return (
      <View style ={{flex:1}}>
        <Navigator/>
        <FlashMessage position = 'top'/> 
      </View>
  );
}

export default App;