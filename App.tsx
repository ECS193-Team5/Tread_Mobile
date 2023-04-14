import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import Challenge from './pages/challengesPage';
 
const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
		<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options={{ headerShown: false }}/>
        <Stack.Screen name = "Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name = "Challenge" component={Challenge} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;