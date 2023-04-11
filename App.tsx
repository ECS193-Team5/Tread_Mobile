import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './pages/login';
import Signup from './pages/signup';
 
const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
		<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options={{ headerShown: false }}/>
        <Stack.Screen name = "Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;