import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import Navigator from "./components/navigation/navigator"

function handleUrl ({ url }) {
  console.log(url);
}
Linking.addEventListener('url', handleUrl)





function App(): JSX.Element {
  useEffect(() => {
    // Get the deep link used to open the app
    const getUrl = async () => {
      const universalLink = await Linking.getInitialURL();
      console.log("is this the other run?", universalLink);
      //handle universal link
    };

    getUrl();
  });

  return (
      <Navigator/>

  );
}

export default App;