import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
  	flexDirection: 'column',
  	flex: 1,
    marginLeft: '10%',
    marginRight: '10%'
  },
  titleContainer: {
//   	backgroundColor: 'green',
  	flex: 20,
  	justifyContent: 'flex-end'
  },
  formContainer: {
  	flex: 35,
  	justifyContent: 'space-around'
  },
  checkContainer: {
  	backgroundColor: 'blue',
  	flex: 15
  },
  signupContainer: {
//   	backgroundColor: 'yellow',
  	flex: 20,
//   	alignItems: 'center'
  },
  signinContainer: {
  	backgroundColor: 'black',
  	flex: 10
  },
  title: {
  	color: '#014421',
  	fontSize: 32,
  	fontWeight: 400,
  	fontFamily: 'inter'
  },
  input: {
  	borderRadius: 50,
  	borderColor: '#9B9595',
  	borderWidth: 2,
  	paddingLeft: 25,
  	color: '#9B9595'
  },
  signupButton: {
  	backgroundColor: '#014421',
  	height: '35%',
  	borderRadius: 50,
  	justifyContent: 'center'
  },
  signupText: {
  	color: 'white',
		alignSelf: 'center',
		fontSize: 16,
		fontWeight: 700
  }

});

export {styles}