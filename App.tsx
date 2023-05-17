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
      console.log(universalLink);
    };

    getUrl();
  });

  return (
<<<<<<< HEAD
      <Navigator/>

=======
      <View style ={{flex:1}}>
        <Navigator/>
        <FlashMessage position = 'top'/> 
      </View>
>>>>>>> 5b5841eff0ab4acc6e7878b55336ad95fbae23cf
  );
}

export default App;