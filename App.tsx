import React, {useEffect} from 'react';
import {Linking, LogBox} from 'react-native';
import Navigator from "./components/navigation/navigator"
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
      <Navigator/>
      
  );
}

export default App;