import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  Pressable
} from 'react-native';

import {styles} from '../css/signup/Style';
 
function Signup(props): JSX.Element {
  return (
		<View style = {styles.mainContainer}>
			<View style = {styles.titleContainer}>
				<Text style = {styles.title}>
					Sign Up
				</Text>
			</View>
			<View style = {styles.formContainer}>
				<TextInput
					placeholder = "email@gmail.com"
					style = {styles.input}
				/>
				<TextInput
					placeholder = "Display Name"
					style = {styles.input}
				/>
				<TextInput
					placeholder = "Username"
					style = {styles.input}
				/>
			</View>
			<View style = {styles.checkContainer}>
			</View>
			<View style = {styles.signupContainer}>
				<Pressable style = {styles.signupButton}>
					<Text style = {styles.signupText}>
						Sign Up
					</Text>
				</Pressable>
			</View>
			<View style = {styles.signinContainer}>
			</View>
		</View>
  )
}


export default Signup;